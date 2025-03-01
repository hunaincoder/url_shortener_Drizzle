import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { userTable } from "../drizzle/schema.js";


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
  