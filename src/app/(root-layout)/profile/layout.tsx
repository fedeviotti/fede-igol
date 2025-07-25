import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { ContentLayout } from '@/components/ContentLayout';

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/profile');
  }

  return <ContentLayout title="Profilo - Area riservata">{children}</ContentLayout>;
}
