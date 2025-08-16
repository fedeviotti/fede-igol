import { NextResponse } from 'next/server';
import { getGarages } from '@/app/(root-layout)/maintenance/actions';

export async function GET() {
  console.log('Fetching all garages');
  const garages = await getGarages();
  return NextResponse.json(garages);
}
