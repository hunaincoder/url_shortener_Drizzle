import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { userTable } from "../drizzle/schema.js";
// import bcrypt from "bcrypt"
import argon2 from "argon2";
import jwt from "jsonwebtoken";

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

export const generateToken = ({ id, name, email }) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
