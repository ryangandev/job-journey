'use client';

import { ArrowRight } from 'lucide-react';
import { Link } from 'next-view-transitions';

import { Button } from '@/components/ui/button';
import useCurrentUser from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';

/** Primary calls to action: sign up / log in, or straight to the dashboard when signed in. */
export default function HeroActions({ className }: { className?: string }) {
  const user = useCurrentUser();

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center',
        className,
      )}
    >
      {user ? (
        <Button asChild size="lg" className="px-6 font-semibold">
          <Link href="/dashboard">
            Go to dashboard
            <ArrowRight />
          </Link>
        </Button>
      ) : (
        <>
          <Button asChild size="lg" className="px-6 font-semibold">
            <Link href="/signup">
              Get started
              <ArrowRight />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="px-6 font-semibold"
          >
            <Link href="/login">Log in</Link>
          </Button>
        </>
      )}
    </div>
  );
}
