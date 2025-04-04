import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const shortlinks = mysqlTable("short_links", {
  id: int().autoincrement().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  shortcode: varchar("shortcode", { length: 25 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
  userID: int("user_id")
    .notNull()
    .references(() => userTable.id),
});

export const sessionTable = mysqlTable("sessions", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  valid: boolean().notNull().default(true),
  ip: varchar({ length: 255 }).notNull(),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export const userTable = mysqlTable("users", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  isEmailValid: boolean("is_email_valid").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export const verifyEmailTokensTable = mysqlTable("is_email_valid", {
  id: int().autoincrement().primaryKey(),
  userId: int()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  token: varchar({ length: 8 }).notNull(),
  expiresAt: timestamp("expires_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 DAY)`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelation = relations(userTable, ({ many }) => ({
  shortlink: many(shortlinks),
  session: many(sessionTable),
}));

export const shortlinksRelation = relations(shortlinks, ({ one }) => ({
  user: one(userTable, {
    fields: [shortlinks.userID],
    references: [userTable.id],
  }),
}));

export const sessionRelation = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));
