import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { ContentLayout } from '@/components/ContentLayout';

export default async function MaintenanceLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/maintenance');
  }

  return <ContentLayout title="Manutenzioni - Area riservata">{children}</ContentLayout>;
}
