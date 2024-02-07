import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const userTable = sqliteTable('userTable', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull()
});

export const sessionTable = sqliteTable( 'sessionTable', {
  id: text('id').notNull().primaryKey(),
  userId: integer('userId').notNull().references(() => userTable.id),
  expiresAt: text('expiresAt').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
