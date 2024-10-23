import type { Metadata } from 'next';

import NewVerificationClientPage from '@/app/(auth)/new-verification/page.client';

export const metadata: Metadata = {
  title: 'New Verification - JobJourney',
};

export default function Page() {
  return <NewVerificationClientPage />;
}
