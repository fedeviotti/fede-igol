import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { ContentLayout } from '@/components/ContentLayout';
import { stackServerApp } from '@/stack';

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect('/handler/sign-in?callbackUrl=/settings');
  }

  return <ContentLayout title="Settings - Area riservata">{children}</ContentLayout>;
}
