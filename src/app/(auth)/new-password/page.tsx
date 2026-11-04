import type { Metadata } from 'next';

import NewPasswordClientPage from '@/app/(auth)/new-password/page.client';

export const metadata: Metadata = {
  title: 'Set a new password',
};

export default function Page() {
  return <NewPasswordClientPage />;
}
