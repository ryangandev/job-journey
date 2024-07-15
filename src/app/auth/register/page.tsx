import React from 'react';
import { Metadata } from 'next';

import RegisterForm from '../../../components/auth/register-form';

export const metadata: Metadata = {
  title: 'Register - JobJourney',
  description: 'Register page',
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <RegisterForm />
    </div>
  );
}
