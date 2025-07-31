import { integer, pgTable, varchar, date } from 'drizzle-orm/pg-core';

export const vehiclesTable = pgTable('vehicles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  type: varchar().notNull(),
  createdAt: date().notNull(),
  deletedAt: date(),
  userId: varchar({ length: 255 }).notNull(),
});
