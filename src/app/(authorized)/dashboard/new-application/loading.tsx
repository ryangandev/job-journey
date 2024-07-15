import React from 'react';
import { NewApplicationFormSkeleton } from '../../../../components/skeletons';

export default function Loading() {
  return (
    <main
      className="flex items-center justify-center"
      style={{
        height: 'calc(100vh - 65px)',
      }}
    >
      <NewApplicationFormSkeleton />
    </main>
  );
}
