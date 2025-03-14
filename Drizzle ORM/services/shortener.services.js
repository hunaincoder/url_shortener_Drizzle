import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortlinks } from "../drizzle/schema.js";

export const getAllShortLinks = async (userId) => {
  return await db
    .select()
    .from(shortlinks)
    .where(eq(shortlinks.userID, userId));
};

export const getShortLinksByShortCode = async (shortcode) => {
  const [result] = await db
    .select()
    .from(shortlinks)
    .where(eq(shortlinks.shortcode, shortcode));
  return result;
};

export const inserShortLink = async ({ url, shortcode, userId }) => {
  await db.insert(shortlinks).values({ url, shortcode, userID : userId });  
};
