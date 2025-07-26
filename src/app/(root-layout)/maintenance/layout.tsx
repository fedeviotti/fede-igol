import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { ContentLayout } from '@/components/ContentLayout';
import { stackServerApp } from '@/stack';

export default async function MaintenanceLayout({ children }: { children: ReactNode }) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect('/handler/sign-in?callbackUrl=/maintenance');
  }

  return <ContentLayout title="Manutenzioni - Area riservata">{children}</ContentLayout>;
}
