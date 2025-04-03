import { desc, eq, lt, sql } from "drizzle-orm";
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
  await db
    .delete(verifyEmailTokensTable)
    .where(lt(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`));

  await db.insert(verifyEmailTokensTable).values({ userId, token });
};

export const createVerifylEmailLink = ({ email, token }) => {
  const encodedURIEmail = encodeURIComponent(email);
  return `http://localhost:3000/verify-email-token/?token=${token}&email=${encodedURIEmail}`;
};

