'use client';

import { useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginAction } from '@/actions/auth-actions';
import {
  AuthContent,
  AuthErrorMessage,
  AuthFooter,
  AuthHero,
  AuthTextButton,
  authLinkClassName,
} from '@/components/auth/auth-components';
import AuthField from '@/components/auth/auth-field';
import AuthStepTransition from '@/components/auth/auth-step-transition';
import OAuthLogins from '@/components/auth/oauth-logins';
import VerificationNeeded from '@/components/auth/verification-needed';
import { Button } from '@/components/ui/button';
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
  const [verificationEmail, setVerificationEmail] = useState('');

  const showVerificationNeeded = (email: string) => {
    setVerificationEmail(email);
    setPageState('verificationNeeded');
  };

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
            <Link href="/signup" className={authLinkClassName}>
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
          <div>
            <Link href="/reset-password" className={authLinkClassName}>
              Forgot password -{'>'}
            </Link>
          </div>

          <div>
            <AuthTextButton onClick={() => setPageState('login')}>
              Back to login
            </AuthTextButton>
          </div>
        </AuthFooter>
      </>
    );
  };

  const renderVerificationNeeded = () => (
    <VerificationNeeded
      email={verificationEmail}
      footer={
        <div>
          Already verified?{' '}
          <AuthTextButton onClick={() => setPageState('login')}>
            Back to login
          </AuthTextButton>
        </div>
      }
    />
  );

  const renderStep = () => {
    switch (pageState) {
      case 'login':
        return renderLogin();
      case 'emailLogin':
        return renderEmailLogin();
      case 'verificationNeeded':
        return renderVerificationNeeded();
    }
  };

  return (
    <AuthStepTransition step={pageState}>{renderStep()}</AuthStepTransition>
  );
}

function LoginForm({
  onVerificationNeeded,
}: {
  onVerificationNeeded: (email: string) => void;
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
        onVerificationNeeded(values.email);
      }

      setErrorMsg(res.error);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col space-y-[14px] pt-[14px]"
    >
      <AuthField
        {...register('email')}
        label="Email address"
        error={errors.email?.message}
        type="email"
        placeholder="Enter your email address..."
        autoFocus
        autoComplete="email"
        disabled={isSubmitting}
      />

      <AuthField
        {...register('password')}
        label="Password"
        error={errors.password?.message}
        type="password"
        placeholder="Enter your password..."
        autoComplete="current-password"
        disabled={isSubmitting}
      />

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
