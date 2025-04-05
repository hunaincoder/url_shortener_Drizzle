import { and, desc, eq, gte, lt, sql } from "drizzle-orm";
import { db } from "../config/db.js";
import {
  sessionTable,
  shortlinks,
  userTable,
  verifyEmailTokensTable,
} from "../drizzle/schema.js";
// import bcrypt from "bcrypt"
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  MILLISECONDS_PER_SECOND,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import crypto from "crypto";

export const getUserByEmail = async (email) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  return user;
};

export const createUser = async ({ name, email, password }) => {
  return await db
    .insert(userTable)
    .values({ name, email, password })
    .$returningId();
};

export const hashPassword = async (password) => {
  // return await bcrypt.hash(password , 10);
  return await argon2.hash(password);
};

export const comparePassword = async (password, hashedPassword) => {
  // return await bcrypt.compare(password, hashedPassword);
  return await argon2.verify(hashedPassword, password);
};

// export const generateToken = ({ id, name, email }) => {
//   return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

export const CreateSession = async (userId, { ip, userAgent }) => {
  await db.insert(sessionTable).values({
    userId, // Match DB column name
    ip, // Direct value assignment
    userAgent, // Snake_case column name
    valid: true,
  });

  // Get last inserted ID using MySQL's LAST_INSERT_ID()
  const [result] = await db.execute(`SELECT LAST_INSERT_ID() AS session_id`);
  return { id: result[0].session_id };
};

export const createAccessToken = ({ id, name, email, sessionId }) => {
  return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //expires in 15 mins
  });
};

export const createRefreshToken = (sessionId) => {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //expires in 1 week
  });
};

export const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const findSessionById = async (sessionId) => {
  const [session] = await db
    .select()
    .from(sessionTable)
    .where(eq(sessionTable.id, sessionId));
  return session;
};

export const findUserById = async (userId) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, userId));
  return user;
};

export const refreshTokens = async (refreshToken) => {
  try {
    const decodedToken = verifyJWTToken(refreshToken);
    const currentSession = await findSessionById(decodedToken.sessionId);

    if (!currentSession || !currentSession.valid) {
      throw new Error("Invalid refresh token");
    }

    const user = await findUserById(currentSession.userId);
    if (!user) throw new Error("invalid user");

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      isEmailValid: user.isEmailValid,
      sessionId: currentSession.id,
    };

    const newAccessToken = createAccessToken(userInfo);
    const newRefreshToken = createRefreshToken(currentSession.id);

    return {
      newAccessToken,
      newRefreshToken,
      user: userInfo,
    };
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const clearUserSession = async (sessionId) => {
  return db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
};

export const getAllShortLinks = async (userId) => {
  return await db
    .select()
    .from(shortlinks)
    .where(eq(shortlinks.userID, userId));
};

export const generateRandonToken = (digit = 8) => {
  const min = 10 ** (digit - 1);
  const max = 10 ** digit;
  return crypto.randomInt(min, max).toString();
};

export const insertVerifyEmailToken = async ({ userId, token }) => {
  return db.transaction(async (tx) => {
    try {
      await tx
        .delete(verifyEmailTokensTable)
        .where(lt(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`));

      await tx
        .delete(verifyEmailTokensTable)
        .where(eq(verifyEmailTokensTable.userId, userId));

      await tx.insert(verifyEmailTokensTable).values({ userId, token });
    } catch (error) {
      console.error("failed to insert verification token ", error);
      throw new Error("unable to create verification token");
    }
  });
};

export const createVerifylEmailLink = ({ email, token }) => {
  const url = new URL("http://localhost:3001/verify-email-token");
  url.searchParams.append("token", token);
  url.searchParams.append("email", email);

  return url.toString();
};

//without joins
// export const findVerificationEmailToken = async ({ token, email }) => {
//   const [tokenData] = await db
//     .select()
//     .from(verifyEmailTokensTable)
//     .where(
//       and(
//         eq(verifyEmailTokensTable.token, token),
//         gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`)
//       )
//     )
//     .limit(1);

//   if (!tokenData) {
//     return null;
//   }

//   const [user] = await db
//     .select()
//     .from(userTable)
//     .where(and(eq(userTable.id, tokenData.userId), eq(userTable.email, email)))
//     .limit(1);

//   if (!user) {
//     return null;
//   }

//   return {
//     userId: user.id,
//     email: user.email,
//     token: tokenData.token,
//     expiresAt: tokenData.expiresAt,
//   };
// };

//with joins
export const findVerificationEmailToken = async ({ token, email }) => {
  return await db
    .select({
      userId: userTable.id,
      email: userTable.email,
      token: verifyEmailTokensTable.token,
      expiresAt: verifyEmailTokensTable.expiresAt,
    })
    .from(verifyEmailTokensTable)
    .where(
      and(
        eq(verifyEmailTokensTable.token, token),
        gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`),
        eq(userTable.email, email)
      )
    )
    .innerJoin(userTable, eq(verifyEmailTokensTable.userId, userTable.id));
};

export const verifyUserEmailAndUpdate = async (email) => {
  try {
    return db
      .update(userTable)
      .set({ isEmailValid: true })
      .where(eq(userTable.email, email));
  } catch (error) {
    console.error(error);
  }
};

export const clearVerifyEmailTokens = async (email) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  return await db
    .delete(verifyEmailTokensTable)
    .where(eq(verifyEmailTokensTable.userId, user.id));
};
