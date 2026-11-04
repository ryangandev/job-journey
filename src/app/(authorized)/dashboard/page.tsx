import type { Metadata } from 'next';

import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard | JobJourney',
};

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(' ')[0];

  return (
    <div className="flex flex-col gap-1 p-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="text-sm text-muted-foreground">
        {firstName ? `Welcome back, ${firstName}.` : 'Welcome back.'}
      </p>
    </div>
  );
}
