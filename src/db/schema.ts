import { integer, pgTable, varchar, date } from 'drizzle-orm/pg-core';

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
  price: integer().notNull(),
  createdAt: date().notNull(),
  deletedAt: date(),
  expiredAt: date(),
  vehicleId: integer().notNull(),
  garageId: integer().notNull(),
});
