'use server';

import { parse } from 'date-fns';
import { and, asc, eq, isNull } from 'drizzle-orm';
import { usersSync as users } from 'drizzle-orm/neon';
import { revalidatePath } from 'next/cache';
import { Garage, Service, Vehicle } from '@/app/types';
import { fetchWithDrizzle } from '@/db/db';
import * as schema from '@/db/schema';

type InsertVehicleProps = Pick<Vehicle, 'name' | 'type'>;

export async function insertVehicle(vehicle: InsertVehicleProps) {
  await fetchWithDrizzle(async (db, { userId }) => {
    return db.insert(schema.vehiclesTable).values({
      name: vehicle.name,
      type: vehicle.type,
      createdAt: new Date().toLocaleDateString(),
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
      .where(and(eq(schema.vehiclesTable.userId, userId), isNull(schema.vehiclesTable.deletedAt)))
      .orderBy(asc(schema.vehiclesTable.createdAt));
  });
}

type InsertGarageProps = Pick<Garage, 'name'>;

export async function insertGarage(vehicle: InsertGarageProps) {
  await fetchWithDrizzle(async (db, { userId }) => {
    return db.insert(schema.garagesTable).values({
      name: vehicle.name,
      createdAt: new Date().toLocaleDateString(),
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
      .where(and(eq(schema.garagesTable.userId, userId), isNull(schema.garagesTable.deletedAt)))
      .orderBy(asc(schema.garagesTable.createdAt));
  });
}

export async function getServices() {
  return fetchWithDrizzle(async (db, { userId }) => {
    return db
      .select({
        id: schema.servicesTable.id,
        name: schema.servicesTable.name,
        createdAt: schema.servicesTable.createdAt,
        price: schema.servicesTable.price,
        executedAt: schema.servicesTable.executedAt,
        expiredAt: schema.servicesTable.expiredAt,
        vehicle: {
          id: schema.vehiclesTable.id,
          name: schema.vehiclesTable.name,
          type: schema.vehiclesTable.type,
          createdAt: schema.vehiclesTable.createdAt,
        },
        garage: {
          id: schema.garagesTable.id,
          name: schema.garagesTable.name,
          createdAt: schema.garagesTable.createdAt,
        },
      })
      .from(schema.servicesTable)
      .leftJoin(schema.vehiclesTable, eq(schema.vehiclesTable.id, schema.servicesTable.vehicleId))
      .leftJoin(schema.garagesTable, eq(schema.garagesTable.id, schema.servicesTable.garageId))
      .leftJoin(users, eq(schema.vehiclesTable.userId, users.id))
      .where(and(eq(users.id, userId), isNull(schema.servicesTable.deletedAt)))
      .orderBy(asc(schema.servicesTable.expiredAt));
  });
}

export async function getServicesByVehicleId({ vehicleId }: { vehicleId: number }) {
  return fetchWithDrizzle(async (db) => {
    return db
      .select({
        id: schema.servicesTable.id,
        name: schema.servicesTable.name,
        createdAt: schema.servicesTable.createdAt,
        price: schema.servicesTable.price,
        executedAt: schema.servicesTable.executedAt,
        expiredAt: schema.servicesTable.expiredAt,
        vehicle: {
          id: schema.vehiclesTable.id,
          name: schema.vehiclesTable.name,
          type: schema.vehiclesTable.type,
          createdAt: schema.vehiclesTable.createdAt,
        },
        garage: {
          id: schema.garagesTable.id,
          name: schema.garagesTable.name,
          createdAt: schema.garagesTable.createdAt,
        },
      })
      .from(schema.servicesTable)
      .leftJoin(schema.vehiclesTable, eq(schema.vehiclesTable.id, schema.servicesTable.vehicleId))
      .leftJoin(schema.garagesTable, eq(schema.garagesTable.id, schema.servicesTable.garageId))
      .where(
        and(eq(schema.servicesTable.vehicleId, vehicleId), isNull(schema.servicesTable.deletedAt))
      )
      .orderBy(asc(schema.servicesTable.expiredAt));
  });
}

type InsertServiceProps = Pick<Service, 'name' | 'price' | 'expiredAt' | 'executedAt'> & {
  vehicleId: number;
  garageId: number;
};

export async function insertService(service: InsertServiceProps) {
  await fetchWithDrizzle(async (db) => {
    return db.insert(schema.servicesTable).values({
      name: service.name,
      price: service.price,
      createdAt: new Date().toLocaleDateString(),
      deletedAt: null,
      expiredAt: service.expiredAt
        ? parse(service.expiredAt, 'yyyy-MM-dd', new Date()).toLocaleDateString()
        : null,
      executedAt: service.executedAt
        ? parse(service.executedAt, 'yyyy-MM-dd', new Date()).toLocaleDateString()
        : null,
      vehicleId: service.vehicleId,
      garageId: service.garageId,
    });
  });

  revalidatePath('/maintenance/home');
}

type UpdateServiceProps = Pick<Service, 'id' | 'name' | 'price' | 'expiredAt' | 'executedAt'> & {
  garageId: number;
};

export async function updateService(service: UpdateServiceProps) {
  await fetchWithDrizzle(async (db) => {
    return db
      .update(schema.servicesTable)
      .set({
        name: service.name,
        price: service.price,
        expiredAt: service.expiredAt
          ? parse(service.expiredAt, 'yyyy-MM-dd', new Date()).toLocaleDateString()
          : null,
        executedAt: service.executedAt
          ? parse(service.executedAt, 'yyyy-MM-dd', new Date()).toLocaleDateString()
          : null,
        garageId: service.garageId,
      })
      .where(eq(schema.servicesTable.id, service.id));
  });

  revalidatePath('/maintenance/home');
}

export async function deleteService(serviceId: number) {
  await fetchWithDrizzle(async (db) => {
    return db
      .update(schema.servicesTable)
      .set({
        deletedAt: new Date().toLocaleDateString(),
      })
      .where(eq(schema.servicesTable.id, serviceId));
  });

  revalidatePath('/maintenance/home');
}

export async function deleteVehicle(vehicleId: number) {
  await fetchWithDrizzle(async (db) => {
    return db
      .update(schema.vehiclesTable)
      .set({
        deletedAt: new Date().toLocaleDateString(),
      })
      .where(eq(schema.vehiclesTable.id, vehicleId));
  });

  revalidatePath('/maintenance/home');
}

type UpdateVehicleProps = Pick<Vehicle, 'id' | 'name' | 'type'>;

export async function updateVehicle(vehicle: UpdateVehicleProps) {
  await fetchWithDrizzle(async (db) => {
    return db
      .update(schema.vehiclesTable)
      .set({
        name: vehicle.name,
        type: vehicle.type,
      })
      .where(eq(schema.vehiclesTable.id, vehicle.id));
  });

  revalidatePath('/maintenance/home');
}
