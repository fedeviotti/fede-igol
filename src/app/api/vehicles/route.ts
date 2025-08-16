import { NextResponse } from 'next/server';
import { getVehicles } from '@/app/(root-layout)/maintenance/actions';

export async function GET() {
  console.log('Fetching all vehicles');
  const vehicles = await getVehicles();
  return NextResponse.json(vehicles);
}
