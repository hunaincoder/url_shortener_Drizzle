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

export const insertShortLink = async ({ url, shortcode, userId }) => {
  await db.insert(shortlinks).values({ url, shortcode, userID: userId });
};

export const getShortLinksById = async (id) => {
  const [result] = await db
    .select()
    .from(shortlinks)
    .where(eq(shortlinks.id, id));
  return result;
};

export const updateShortCode = async ({ id, url, shortcode }) => {
  return await db
    .update(shortlinks)
    .set({ url, shortcode })
    .where(eq(shortlinks.id, id));
};

export const deleteShortCodeById = async (id) => {
  return await db.delete(shortlinks).where(eq(shortlinks.id, id));
};
