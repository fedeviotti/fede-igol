import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { ContentLayout } from '@/components/ContentLayout';
import { stackServerApp } from '@/stack';

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect('/handler/sign-in?callbackUrl=/profile');
  }

  return <ContentLayout title="Profilo - Area riservata">{children}</ContentLayout>;
}
