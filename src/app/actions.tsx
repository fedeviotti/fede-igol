'use server';

import * as schema from '@/db/schema';
import { usersSync as users } from 'drizzle-orm/neon';
import { revalidatePath } from 'next/cache';
import { fetchWithDrizzle } from '@/db/db';
import { Vehicle } from '@/app/types';
import { asc, eq } from 'drizzle-orm';

export async function insertVehicle(vehicle: Vehicle) {
  await fetchWithDrizzle(async (db, { userId }) => {
    return db.insert(schema.vehiclesTable).values({
      name: vehicle.name,
      type: vehicle.type,
      createdAt: new Date().toISOString(),
      deletedAt: null,
      userId,
    });
  });

  revalidatePath('/maintenance');
}

export async function getVehicles() {
  return fetchWithDrizzle(async (db) => {
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
      .orderBy(asc(schema.vehiclesTable.createdAt));
  });
}
