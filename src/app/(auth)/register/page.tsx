import type { Metadata } from 'next';

import RegisterForm from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Register - JobJourney',
  description: 'Sign up to create your account',
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <RegisterForm />
    </main>
  );
}
