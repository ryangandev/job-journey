import React from 'react';
import { Metadata } from 'next';

import LoginForm from '../../../components/auth/login-form';

export const metadata: Metadata = {
  title: 'Login - JobJourney',
  description: 'Login page',
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
