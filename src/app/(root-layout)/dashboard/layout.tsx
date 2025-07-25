import { ReactNode } from 'react';
import { ContentLayout } from '@/components/ContentLayout';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect('/handler/sign-in?callbackUrl=/dashboard');
  }

  return <ContentLayout title="Dashboard - Area riservata">{children}</ContentLayout>;
}
