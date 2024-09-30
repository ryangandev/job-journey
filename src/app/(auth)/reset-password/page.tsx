import type { Metadata } from 'next';

import ResetPasswordForm from '@/components/auth/reset-password-form';

export const metadata: Metadata = {
  title: 'Reset Password - JobJourney',
  description: 'Reset your password',
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <ResetPasswordForm />
    </main>
  );
}