import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import JobApplicationsBoard from '@/components/job-applications/job-applications-board';
import { getJobApplicationsByUserId } from '@/data/job-applications';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  // The proxy already guards this route; this also narrows the type
  if (!userId) redirect('/login');

  const applications = await getJobApplicationsByUserId(userId);

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      {applications ? (
        <JobApplicationsBoard applications={applications} />
      ) : (
        <div className="rounded-lg border border-dashed px-6 py-16 text-center">
          <p className="font-medium">We couldn&apos;t load your applications</p>
          <p className="text-sm text-muted-foreground">
            Please refresh the page in a moment.
          </p>
        </div>
      )}
    </div>
  );
}
