import React from 'react';
import { Metadata } from 'next';

import { auth } from '../../../../auth';
import NewApplicationForm from '../../../../components/dashboard/new-application-form';
import NotAuthorized from '../../../../components/not-authorized';

export const metadata: Metadata = {
  title: 'New Application - JobJourney',
  description: 'Add new application to the job application dashboard.',
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <NotAuthorized />;
  }

  return (
    <main
      className="flex items-center justify-center"
      style={{
        height: 'calc(100vh - 65px)',
      }}
    >
      <NewApplicationForm userId={session.user.id} />
    </main>
  );
}
