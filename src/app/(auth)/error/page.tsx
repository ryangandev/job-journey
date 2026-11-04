import type { Metadata } from 'next';

import { Link } from 'next-view-transitions';

import {
  AuthContent,
  AuthFooter,
  AuthHero,
  authLinkClassName,
} from '@/components/auth/auth-components';

export const metadata: Metadata = {
  title: 'Error',
};

export default function Page() {
  return (
    <>
      <AuthHero>You encountered an error</AuthHero>
      <AuthContent>
        <p className="text-center text-[13px] text-muted-foreground">
          Oops! Something went wrong!
        </p>
      </AuthContent>
      <AuthFooter>
        <Link href="/login" className={authLinkClassName}>
          Back to Login -{'>'}
        </Link>
      </AuthFooter>
    </>
  );
}
