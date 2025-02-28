import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const shortlinks = mysqlTable("short_links", {
  id: int().autoincrement().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  shortcode: varchar("shortcode", { length: 25 }).notNull().unique(),
});
