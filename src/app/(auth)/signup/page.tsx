import type { Metadata } from 'next';

import SignupClientPage from '@/app/(auth)/signup/page.client';

export const metadata: Metadata = {
  title: 'Signup - JobJourney',
};

export default function Page() {
  return <SignupClientPage />;
}
