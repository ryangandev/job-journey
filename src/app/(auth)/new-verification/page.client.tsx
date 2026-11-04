'use client';

import { Link } from 'next-view-transitions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [verificationError, setVerificationError] = useState<
    string | undefined
  >('');
  // A missing token is known during render, so derive it instead of setting state in the effect
  const errorMsg = token ? verificationError : 'Missing valid token!';

  useEffect(() => {
    if (!token) return;

    newVerificationAction(token)
      .then((res) => {
        if (res.success) {
          setPageState('completed');
        }

        setVerificationError(res.error);
      })
      .catch(() => {
        setVerificationError('Something went wrong!');
      });
  }, [token]);

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
