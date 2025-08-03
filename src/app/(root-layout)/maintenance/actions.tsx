'use server';

import * as schema from '@/db/schema';
import { usersSync as users } from 'drizzle-orm/neon';
import { revalidatePath } from 'next/cache';
import { fetchWithDrizzle } from '@/db/db';
import { Garage, Vehicle } from '@/app/types';
import { asc, eq } from 'drizzle-orm';

type InsertVehicleProps = Pick<Vehicle, 'name' | 'type'>;

export async function insertVehicle(vehicle: InsertVehicleProps) {
  await fetchWithDrizzle(async (db, { userId }) => {
    return db.insert(schema.vehiclesTable).values({
      name: vehicle.name,
      type: vehicle.type,
      createdAt: new Date().toISOString(),
      deletedAt: null,
      userId,
    });
  });

  revalidatePath('/maintenance/home');
}

export async function getVehicles() {
  return fetchWithDrizzle(async (db, { userId }) => {
    return db
      .select({
        id: schema.vehiclesTable.id,
        name: schema.vehiclesTable.name,
        type: schema.vehiclesTable.type,
        createdAt: schema.vehiclesTable.createdAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(schema.vehiclesTable)
      .leftJoin(users, eq(schema.vehiclesTable.userId, users.id))
      .where(eq(schema.vehiclesTable.userId, userId))
      .orderBy(asc(schema.vehiclesTable.createdAt));
  });
}

type InsertGarageProps = Pick<Garage, 'name'>;

export async function insertGarage(vehicle: InsertGarageProps) {
  await fetchWithDrizzle(async (db, { userId }) => {
    return db.insert(schema.garagesTable).values({
      name: vehicle.name,
      createdAt: new Date().toISOString(),
      deletedAt: null,
      userId,
    });
  });

  revalidatePath('/maintenance/home');
}

export async function getGarages() {
  return fetchWithDrizzle(async (db, { userId }) => {
    return db
      .select({
        id: schema.garagesTable.id,
        name: schema.garagesTable.name,
        createdAt: schema.garagesTable.createdAt,
      })
      .from(schema.garagesTable)
      .leftJoin(users, eq(schema.garagesTable.userId, users.id))
      .where(eq(schema.garagesTable.userId, userId))
      .orderBy(asc(schema.garagesTable.createdAt));
  });
}
