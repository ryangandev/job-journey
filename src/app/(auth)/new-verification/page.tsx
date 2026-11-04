import type { Metadata } from 'next';

import NewVerificationClientPage from '@/app/(auth)/new-verification/page.client';

export const metadata: Metadata = {
  title: 'Verify email',
};

export default function Page() {
  return <NewVerificationClientPage />;
}
