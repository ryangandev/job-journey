'use client';

import { ArrowLeft, Hourglass } from 'lucide-react';
import { Link } from 'next-view-transitions';

import { Button } from '@/components/ui/button';
import useCurrentUser from '@/hooks/use-current-user';

/** Placeholder for landing pages whose content has not been written yet. */
export default function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const user = useCurrentUser();

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center rounded-lg border border-dashed px-6 py-16 text-center sm:px-12 sm:py-20">
      <span className="flex size-12 items-center justify-center rounded-lg border bg-muted">
        <Hourglass className="size-5 text-muted-foreground" aria-hidden />
      </span>
      <p className="mt-6 text-sm font-semibold text-muted-foreground">
        Coming soon
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-pretty text-muted-foreground">{description}</p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {user ? (
          <Button asChild className="font-semibold">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        ) : (
          <Button asChild className="font-semibold">
            <Link href="/signup">Get started</Link>
          </Button>
        )}
        <Button asChild variant="outline" className="font-semibold">
          <Link href="/">
            <ArrowLeft />
            Back to home
          </Link>
        </Button>
      </div>
    </section>
  );
}
