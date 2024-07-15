import React from 'react';
import { Metadata } from 'next';

import NewVerificationForm from '../../../components/auth/new-verification-form';

export const metadata: Metadata = {
  title: 'New Verification - JobJourney',
  description: 'New verification page',
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <NewVerificationForm />
    </div>
  );
}
