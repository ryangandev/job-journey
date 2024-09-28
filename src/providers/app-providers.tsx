'use client';

import { useRouter } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';

import { ThemeProvider } from '@/providers/theme-provider';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
