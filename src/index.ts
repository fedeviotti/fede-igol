import 'dotenv/config';
import { format } from 'date-fns';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { vehiclesTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const vehicle: typeof vehiclesTable.$inferInsert = {
    name: 'Renault Captur',
    type: 'car',
    createdAt: format(new Date(), 'yyyy-MM-dd'),
    deletedAt: null,
    userId: '123',
  };

  await db.insert(vehiclesTable).values(vehicle);
  console.log('New vehicle created!');

  const vehicles = await db.select().from(vehiclesTable);
  console.log('Getting all vehicles from the database: ', vehicles);

  await db
    .update(vehiclesTable)
    .set({
      userId: '1234',
    })
    .where(eq(vehiclesTable.name, vehicle.name));
  console.log('Vehicle info updated!');

  //await db.delete(vehiclesTable).where(eq(vehiclesTable.name, vehicle.name));
  //console.log('Vehicle deleted!');
}

main();
