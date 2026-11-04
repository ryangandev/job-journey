'use client';

import { Link } from 'next-view-transitions';
import { useEffect } from 'react';

import {
  AuthContent,
  AuthFooter,
  AuthHero,
  AuthShell,
  authLinkClassName,
} from '@/components/auth/auth-components';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // Logged for debugging only; the message is never shown to users
    console.error(error);
  }, [error]);

  return (
    <AuthShell>
      <main className="w-full">
        <AuthHero>Something went wrong</AuthHero>
        <AuthContent className="space-y-6">
          <p className="text-center text-[13px] text-muted-foreground">
            An unexpected error occurred. Please try again, or head back to the
            home page.
          </p>
          {/* retry() re-fetches and re-renders the segment; reset() would only re-render */}
          <Button size="auth" variant="outline" onClick={() => retry()}>
            Try again
          </Button>
        </AuthContent>
        <AuthFooter>
          <Link href="/" className={authLinkClassName}>
            Back to home -{'>'}
          </Link>
        </AuthFooter>
      </main>
    </AuthShell>
  );
}
