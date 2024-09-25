import type { Metadata } from 'next';

import localFont from 'next/font/local';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';
import AppProviders from '@/providers/app-providers';
import '@/styles/globals.css';

const geistSans = localFont({
  src: '../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

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
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'relative min-h-screen antialiased',
        )}
      >
        <AppProviders>
          {children}
          <Toaster richColors />
        </AppProviders>
      </body>
    </html>
  );
}
