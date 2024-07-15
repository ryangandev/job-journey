import React from 'react';

export default function LoadingError({ error }: { error: string }) {
  return (
    <main
      className="flex h-full items-center justify-center p-4"
      style={{
        height: 'calc(100vh - 65px)',
      }}
    >
      <p className="text-center text-2xl font-bold">❗️ {error}</p>
    </main>
  );
}
