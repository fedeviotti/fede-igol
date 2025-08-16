import { NextRequest, NextResponse } from 'next/server';
import { getServices, getServicesByVehicleId } from '@/app/(root-layout)/maintenance/actions';

export async function GET(req: NextRequest) {
  const vehicleId = req.nextUrl.searchParams.get('vehicleId');

  if (vehicleId) {
    const vehicleIdNumber = Number(vehicleId);
    console.log('Fetching services for vehicleId:', vehicleIdNumber);
    const services = await getServicesByVehicleId({ vehicleId: vehicleIdNumber });
    return NextResponse.json(services);
  }

  // If no vehicleId, return all services
  console.log('Fetching all services');
  const services = await getServices();
  return NextResponse.json(services);
}
