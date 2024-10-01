import { SessionProvider } from 'next-auth/react';

import SiteHeader from '@/components/site-header';
import { auth } from '@/lib/auth';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <SiteHeader />
      <div className="w-full px-4 py-6">{children}</div>
    </SessionProvider>
  );
}
