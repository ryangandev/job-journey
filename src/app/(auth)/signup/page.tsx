import type { Metadata } from 'next';

import SignupClientPage from '@/app/(auth)/signup/page.client';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function Page() {
  return <SignupClientPage />;
}
