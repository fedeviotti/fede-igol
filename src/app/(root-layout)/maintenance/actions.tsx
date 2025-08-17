'use server';

import { format } from 'date-fns';
import { and, asc, eq, isNotNull, isNull, lte } from 'drizzle-orm';
import { usersSync as users } from 'drizzle-orm/neon';
import { Garage, Service, Vehicle } from '@/app/types';
import { fetchWithDrizzle } from '@/db/db';
import * as schema from '@/db/schema';

type InsertVehicleProps = Pick<Vehicle, 'name' | 'type'>;

export async function insertVehicle(vehicle: InsertVehicleProps) {
  await fetchWithDrizzle(async (db, { userId }) => {
    return db.insert(schema.vehiclesTable).values({
      name: vehicle.name,
      type: vehicle.type,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      deletedAt: null,
      userId,
    });
  });
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
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      deletedAt: null,
      userId,
    });
  });
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

export async function getExpiringServices() {
  return fetchWithDrizzle(async (db, { userId }) => {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

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
      .where(
        and(
          eq(users.id, userId),
          isNull(schema.servicesTable.deletedAt),
          isNotNull(schema.servicesTable.expiredAt),
          lte(schema.servicesTable.expiredAt, oneWeekFromNow.toISOString().split('T')[0])
        )
      )
      .orderBy(asc(schema.servicesTable.expiredAt));
  });
}

export async function getServiceById({ serviceId }: { serviceId: number }) {
  return fetchWithDrizzle(async (db, { userId }) => {
    const result = await db
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
      .where(
        and(
          eq(schema.servicesTable.id, serviceId),
          eq(users.id, userId),
          isNull(schema.servicesTable.deletedAt)
        )
      );

    return result[0] || null;
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
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      deletedAt: null,
      expiredAt: service.expiredAt ? service.expiredAt : null,
      executedAt: service.executedAt ? service.executedAt : null,
      vehicleId: service.vehicleId,
      garageId: service.garageId,
    });
  });
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
        expiredAt: service.expiredAt ? service.expiredAt : null,
        executedAt: service.executedAt ? service.executedAt : null,
        garageId: service.garageId,
      })
      .where(eq(schema.servicesTable.id, service.id));
  });
}

export async function deleteService(serviceId: number) {
  await fetchWithDrizzle(async (db) => {
    return db
      .update(schema.servicesTable)
      .set({
        deletedAt: format(new Date(), 'yyyy-MM-dd'),
      })
      .where(eq(schema.servicesTable.id, serviceId));
  });
}

export async function deleteVehicle(vehicleId: number) {
  await fetchWithDrizzle(async (db) => {
    return db
      .update(schema.vehiclesTable)
      .set({
        deletedAt: format(new Date(), 'yyyy-MM-dd'),
      })
      .where(eq(schema.vehiclesTable.id, vehicleId));
  });
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
}

type UpdateGarageProps = Pick<Garage, 'id' | 'name'>;

export async function updateGarage(garage: UpdateGarageProps) {
  await fetchWithDrizzle(async (db) => {
    return db
      .update(schema.garagesTable)
      .set({
        name: garage.name,
      })
      .where(eq(schema.garagesTable.id, garage.id));
  });
}

export async function deleteGarage(garageId: number) {
  await fetchWithDrizzle(async (db) => {
    return db
      .update(schema.garagesTable)
      .set({
        deletedAt: format(new Date(), 'yyyy-MM-dd'),
      })
      .where(eq(schema.garagesTable.id, garageId));
  });
}
