import { NextRequest, NextResponse } from 'next/server';
import { getServicesByVehicleId } from '@/app/(root-layout)/maintenance/actions';

export async function GET(req: NextRequest) {
  const vehicleId = req.nextUrl.searchParams.get('vehicleId');

  if (!vehicleId) {
    return NextResponse.json({ error: 'Missing vehicleId' }, { status: 400 });
  }
  const vehicleIdNumber = Number(vehicleId);

  console.log('Fetching services for vehicleId:', vehicleIdNumber);

  const services = await getServicesByVehicleId({ vehicleId: vehicleIdNumber });

  return NextResponse.json(services);
}
