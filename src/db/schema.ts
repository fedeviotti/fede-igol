import { date, integer, numeric, pgTable, varchar } from 'drizzle-orm/pg-core';

export const vehiclesTable = pgTable('vehicles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  type: varchar().notNull(),
  createdAt: date().notNull(),
  deletedAt: date(),
  userId: varchar({ length: 255 }).notNull(),
});

export const garagesTable = pgTable('garages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: date().notNull(),
  deletedAt: date(),
  userId: varchar({ length: 255 }).notNull(),
});

export const servicesTable = pgTable('services', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: date().notNull(),
  deletedAt: date(),
  executedAt: date(),
  expiredAt: date(),
  vehicleId: integer().notNull(),
  garageId: integer().notNull(),
});
