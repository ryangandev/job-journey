import React from 'react';
import { Metadata } from 'next';

import { LinkTab, LinkTabs } from '../../../components/link-tabs';
import PageHeader from '../../../components/page-header';

export const metadata: Metadata = {
  title: 'Digital Profile - JobJourney',
  description: 'Your digital profile.',
};

export default function DigitalProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-5xl space-y-8 py-4">
        <PageHeader>Digital Profile</PageHeader>
        <LinkTabs>
          <LinkTab
            key="Profile"
            title="Profile"
            path="/digital-profile/profile"
          />
          <LinkTab
            key="Resumes"
            title="Resumes"
            path="/digital-profile/resumes"
          />
        </LinkTabs>
        {children}
      </div>
    </main>
  );
}
