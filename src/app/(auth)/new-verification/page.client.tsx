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
  authLinkClassName,
} from '@/components/auth/auth-components';
import AuthStepTransition from '@/components/auth/auth-step-transition';

export default function ClientPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [pageState, setPageState] = useState<'verifying' | 'completed'>(
    'verifying',
  );
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

  const renderVerifying = () => {
    return (
      <>
        <AuthHero>Account verification</AuthHero>

        <AuthContent>
          {errorMsg ? (
            <AuthErrorMessage message={errorMsg} className="mx-auto" />
          ) : (
            <div role="status" className="flex flex-col space-y-[14px]">
              <CgSpinnerTwoAlt
                className="mx-auto animate-spin motion-reduce:animate-none"
                size={24}
                aria-hidden="true"
              />
              <p className="text-center text-[13px] text-muted-foreground">
                Hang tight, verifying your account...
              </p>
            </div>
          )}
        </AuthContent>

        <AuthFooter>
          <Link href="/login" className={authLinkClassName}>
            Back to Login -{'>'}
          </Link>
        </AuthFooter>
      </>
    );
  };

  const renderCompleted = () => {
    return (
      <>
        <AuthHero>Verification completed</AuthHero>

        <AuthContent>
          <p className="text-center text-[13px] text-muted-foreground">
            Your account has been successfully verified.
          </p>
        </AuthContent>

        <AuthFooter>
          <Link href="/login" className={authLinkClassName}>
            Back to Login -{'>'}
          </Link>
        </AuthFooter>
      </>
    );
  };

  const renderStep = () => {
    switch (pageState) {
      case 'verifying':
        return renderVerifying();
      case 'completed':
        return renderCompleted();
    }
  };

  return (
    <AuthStepTransition step={pageState}>{renderStep()}</AuthStepTransition>
  );
}
