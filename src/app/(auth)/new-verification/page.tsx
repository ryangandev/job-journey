import type { Metadata } from 'next';

import NewVerificationForm from '@/components/auth/new-verification-form';

export const metadata: Metadata = {
  title: 'New Verification - JobJourney',
  description: 'Verify your email address',
};

export default function Page() {
  return (
    <main className="flex justify-center">
      <NewVerificationForm />
    </main>
  );
}
