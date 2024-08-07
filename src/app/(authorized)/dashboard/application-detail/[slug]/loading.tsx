import React from 'react';
import { Divider, Spinner } from '@nextui-org/react';

import { ApplicationInfoSkeleton } from '../../../../../components/skeletons';

export default function Loading() {
  return (
    <main className="flex justify-center px-4 py-8">
      <section className="flex w-full max-w-[48rem] flex-col space-y-6">
        <ApplicationInfoSkeleton />
        <Divider orientation="horizontal" />
        <Spinner label="Loading application updates..." />
      </section>
    </main>
  );
}
