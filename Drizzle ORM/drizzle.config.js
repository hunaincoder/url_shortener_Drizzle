import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./drizzle/schema.js",
  dialect: "mysql",
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
