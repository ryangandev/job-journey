'use client';

import { Link } from 'next-view-transitions';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

import { newVerificationAction } from '@/actions/auth-actions';
import {
  AuthContent,
  AuthErrorMessage,
  AuthFooter,
  AuthHero,
} from '@/components/auth/auth-components';

export default function ClientPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [pageState, setPageState] = useState<
    'newPasswordRequest' | 'completed'
  >('newPasswordRequest');
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');

  const onSubmit = useCallback(async () => {
    if (!token) {
      setErrorMsg('Missing valid token!');
      return;
    }

    await newVerificationAction(token)
      .then((res) => {
        if (res.success) {
          setPageState('completed');
        }

        setErrorMsg(res.error);
      })
      .catch(() => {
        setErrorMsg('Something went wrong!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  const renderEmailRequest = () => {
    return (
      <>
        <AuthHero>Account verification</AuthHero>

        <AuthContent>
          {errorMsg ? (
            <AuthErrorMessage message={errorMsg} className="mx-auto" />
          ) : (
            <>
              <CgSpinnerTwoAlt className="mx-auto animate-spin" size={24} />
              <p className="text-center text-[13px] text-muted-foreground">
                Hang tight, verifying your account...
              </p>
            </>
          )}
        </AuthContent>

        <AuthFooter>
          <Link
            href="/login"
            className="text-accent-foreground underline-offset-2 hover:underline"
          >
            Back to Login -{'>'}
          </Link>
        </AuthFooter>
      </>
    );
  };

  const renderVerificationNeeded = () => {
    return (
      <>
        <AuthHero>Verification completed</AuthHero>

        <AuthContent>
          <p className="text-center text-[13px] text-muted-foreground">
            Your account has been successfully verified.
          </p>
        </AuthContent>

        <AuthFooter>
          <Link
            href="/login"
            className="text-accent-foreground underline-offset-2 hover:underline"
          >
            Back to Login -{'>'}
          </Link>
        </AuthFooter>
      </>
    );
  };

  // TODO: Implement animation when switching between rendering
  switch (pageState) {
    case 'newPasswordRequest':
      return renderEmailRequest();
    case 'completed':
      return renderVerificationNeeded();
  }
}
