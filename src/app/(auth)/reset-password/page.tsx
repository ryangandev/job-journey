import type { Metadata } from 'next';

import ResetPasswordClientPage from '@/app/(auth)/reset-password/page.client';

export const metadata: Metadata = {
  title: 'Reset Password - JobJourney',
};

export default function Page() {
  return <ResetPasswordClientPage />;
}
