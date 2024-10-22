import type { Metadata } from 'next';

import LoginClientPage from '@/app/(auth)/login/page.client';

export const metadata: Metadata = {
  title: 'Login - JobJourney',
};

export default function Page() {
  return <LoginClientPage />;
}
