import type { Metadata } from 'next';

import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In - JobJourney',
  description: 'Sign in to your dashboard',
};

export default function Page() {
  return (
    <main className="flex justify-center">
      <LoginForm />
    </main>
  );
}
