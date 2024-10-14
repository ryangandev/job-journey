import type { Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import { inter } from '@/assets/fonts/fonts';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import AppProviders from '@/providers/app-providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Job Journey',
  description: 'Organize and streamline your job search with JobJourney',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'relative flex min-h-screen flex-col antialiased',
        )}
      >
        <AppProviders>
          <SessionProvider session={session}>
            {children}
            <Toaster richColors />
          </SessionProvider>
        </AppProviders>
      </body>
    </html>
  );
}
