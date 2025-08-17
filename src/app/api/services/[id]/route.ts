import { NextRequest, NextResponse } from 'next/server';
import { getServiceById } from '@/app/(root-layout)/maintenance/actions';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const serviceId = Number(id);

    if (isNaN(serviceId)) {
      return NextResponse.json({ error: 'ID servizio non valido' }, { status: 400 });
    }

    console.log('Fetching service with ID:', serviceId);
    const service = await getServiceById({ serviceId });

    if (!service) {
      return NextResponse.json({ error: 'Servizio non trovato' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
