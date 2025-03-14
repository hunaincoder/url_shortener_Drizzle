import { relations } from "drizzle-orm";
import {
  date,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const shortlinks = mysqlTable("short_links", {
  id: int().autoincrement().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  shortcode: varchar("shortcode", { length: 25 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().onUpdateNow(), 
  userID : int("user_id").notNull().references(()=> userTable.id),   //foreign key
});

export const userTable = mysqlTable("users", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});


export const usersRelation = relations(userTable , ({many}) => ({
  shortlink : many(shortlinks) 
}))

export const shortlinksRelation = relations(shortlinks , ({one}) => ({
  user : one(userTable , {
    fields : [shortlinks.userID], //foreign key
    references : [userTable.id]
  })
}))