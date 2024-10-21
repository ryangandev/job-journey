import type { Metadata } from 'next';

import LoginClientPage from '@/app/(auth)/login/page.client';

export const metadata: Metadata = {
  title: 'Log in - JobJourney',
};

export default function Page() {
  return <LoginClientPage />;
}
