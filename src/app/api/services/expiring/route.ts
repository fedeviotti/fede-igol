import { NextResponse } from 'next/server';
import { getExpiringServices } from '@/app/(root-layout)/maintenance/actions';

export async function GET() {
  try {
    const services = await getExpiringServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching expiring services:', error);
    return NextResponse.json({ error: 'Failed to fetch expiring services' }, { status: 500 });
  }
}
