'use client';

import { useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginAction } from '@/actions/auth-actions';
import {
  AuthContent,
  AuthErrorMessage,
  AuthFooter,
  AuthHero,
} from '@/components/auth/auth-components';
import OAuthLogins from '@/components/auth/oauth-logins';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas/auth-schema';

export default function ClientPage() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email used with another provider'
      : '';

  const [pageState, setPageState] = useState<
    'login' | 'emailLogin' | 'verificationNeeded'
  >('login');
  const [resendTimer, setResendTimer] = useState(0);

  // Start the resend cooldown in the event that shows the verification screen,
  // instead of setting state synchronously inside the effect below.
  const showVerificationNeeded = () => {
    setResendTimer(60);
    setPageState('verificationNeeded');
  };

  useEffect(() => {
    if (pageState !== 'verificationNeeded') return;

    const timerInterval = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [pageState]);

  const renderLogin = () => {
    return (
      <>
        <AuthHero>Login to JobJourney</AuthHero>

        <AuthContent>
          <OAuthLogins />
          <Button
            size="auth"
            variant="outline"
            onClick={() => setPageState('emailLogin')}
          >
            Continue with Email
          </Button>
          <AuthErrorMessage message={urlError} className="mt-0" />
        </AuthContent>

        <AuthFooter>
          <div>
            Need an account?{' '}
            <Link
              href="/signup"
              className="text-accent-foreground underline-offset-2 hover:underline"
            >
              Sign up -{'>'}
            </Link>
          </div>
        </AuthFooter>
      </>
    );
  };

  const renderEmailLogin = () => {
    return (
      <>
        <AuthHero>Login via email</AuthHero>

        <LoginForm onVerificationNeeded={showVerificationNeeded} />

        <AuthFooter>
          <Link
            href="/reset-password"
            className="text-accent-foreground underline-offset-2 hover:underline"
          >
            Forgot password -{'>'}
          </Link>

          <div
            className="cursor-pointer transition-colors hover:text-accent-foreground"
            onClick={() => setPageState('login')}
          >
            Back to login
          </div>
        </AuthFooter>
      </>
    );
  };

  const renderVerificationNeeded = () => {
    const handleResendEmail = async () => {
      setResendTimer(60);

      // TODO: Implement resend email functionality
    };

    return (
      <>
        <AuthHero>Please verify your email</AuthHero>

        <AuthContent className="space-y-6 text-center">
          <p className="text-[13px] text-muted-foreground">
            We&apos;ve sent a verification email to your inbox. Please click the
            link to complete your registration.
          </p>
          <p className="text-[13px] text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or click below
            to resend it.
          </p>
          <Button
            size="auth"
            variant="outline"
            onClick={handleResendEmail}
            disabled={resendTimer > 0}
          >
            {resendTimer > 0
              ? `Resend verification email (${resendTimer}s)`
              : 'Resend verification email'}
          </Button>
        </AuthContent>

        <AuthFooter>
          <div>
            Already verified?{' '}
            <span
              className="cursor-pointer transition-colors hover:text-accent-foreground"
              onClick={() => setPageState('login')}
            >
              Back to login
            </span>
          </div>
        </AuthFooter>
      </>
    );
  };

  // TODO: Implement animation when switching between rendering
  switch (pageState) {
    case 'login':
      return renderLogin();
    case 'emailLogin':
      return renderEmailLogin();
    case 'verificationNeeded':
      return renderVerificationNeeded();
  }
}

function LoginForm({
  onVerificationNeeded,
}: {
  onVerificationNeeded: () => void;
}) {
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof LoginSchema>,
    unknown,
    z.output<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.output<typeof LoginSchema>) => {
    setErrorMsg('');

    await loginAction(values).then((res) => {
      if (!res) return;

      if (res.verificationNeeded) {
        onVerificationNeeded();
      }

      setErrorMsg(res.error);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-[14px] pt-[14px]"
    >
      <div>
        <Input
          {...register('email')}
          className="h-12 placeholder:text-[13px]"
          type="text"
          placeholder="Enter your email address..."
          autoFocus
          autoComplete="off"
          disabled={isSubmitting}
        />
        <AuthErrorMessage message={errors.email?.message} />
      </div>

      <div>
        <Input
          {...register('password')}
          className="h-12 placeholder:text-[13px]"
          type="password"
          placeholder="Enter your password..."
          autoComplete="off"
          disabled={isSubmitting}
        />
        <AuthErrorMessage message={errors.password?.message} />
      </div>

      <Button
        type="submit"
        size="auth"
        variant="outline"
        isLoading={isSubmitting}
      >
        Log in
      </Button>

      <AuthErrorMessage message={errorMsg} className="mt-0" />
    </form>
  );
}
