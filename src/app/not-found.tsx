import type { Metadata } from 'next';

import { Link } from 'next-view-transitions';

import {
  AuthContent,
  AuthFooter,
  AuthHero,
  AuthShell,
  authLinkClassName,
} from '@/components/auth/auth-components';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <AuthShell>
      <main className="w-full">
        <AuthHero>Page not found</AuthHero>
        <AuthContent>
          <p className="text-center text-[13px] text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
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
