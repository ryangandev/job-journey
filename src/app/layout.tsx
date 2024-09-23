import type { Metadata } from 'next';

import { Toaster } from 'sonner';

import { geistSans } from '@/assets/font';
import { cn } from '@/lib/utils';
import AppProviders from '@/providers/app-providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Job Journey',
  description: 'Organize and streamline your job search with JobJourney',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(geistSans.className, `relative antialiased`)}>
        <AppProviders>

        {children}

        </AppProviders>
        <Toaster richColors />
      </body>
    </html>
  );
}
