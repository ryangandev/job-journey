import type { Metadata } from 'next';

import NewPasswordForm from '@/components/auth/new-password-form';

export const metadata: Metadata = {
  title: 'New Password - JobJourney',
  description: 'Enter your new password',
};

export default function Page() {
  return (
    <main className="flex justify-center">
      <NewPasswordForm />
    </main>
  );
}
