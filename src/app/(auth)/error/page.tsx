import type { Metadata } from 'next';

import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Auth Error - JobJourney',
  description: 'Something went wrong',
};

export default function Page() {
  return (
    <main className="flex flex-col items-center space-y-4">
      <h1 className="text-lg font-semibold">🔐 Auth Error</h1>
      <p>Oops! Something went wrong!</p>
      <Link href="/login" className="text-blue-500 underline">
        Back to login
      </Link>
    </main>
  );
}
