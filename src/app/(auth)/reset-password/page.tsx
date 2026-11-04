import type { Metadata } from 'next';

import ResetPasswordClientPage from '@/app/(auth)/reset-password/page.client';

export const metadata: Metadata = {
  title: 'Reset password',
};

export default function Page() {
  return <ResetPasswordClientPage />;
}
