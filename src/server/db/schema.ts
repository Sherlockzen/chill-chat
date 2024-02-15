import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export type databaseUser = typeof userTable._.inferSelect;
export type databaseSession = typeof sessionTable._.inferSelect;

export const userTable = sqliteTable("userTable", {
  id: text("id").notNull().primaryKey().unique(),
  email: text("email").notNull().unique(),
  githubId: integer("githubId").unique(),
  googleId: integer("googleId").unique(),
  username: text("username"),
});

export const sessionTable = sqliteTable("sessionTable", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: text("expires_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
