import type { Metadata } from 'next';

import NewPasswordClientPage from '@/app/(auth)/new-password/page.client';

export const metadata: Metadata = {
  title: 'New Password - JobJourney',
};

export default function Page() {
  return <NewPasswordClientPage />;
}
