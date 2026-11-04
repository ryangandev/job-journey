'use client';

import { Link } from 'next-view-transitions';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupAction } from '@/actions/auth-actions';
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
import { cn } from '@/lib/utils';
import { SignupSchema } from '@/schemas/auth-schema';

export default function ClientPage() {
  const [pageState, setPageState] = useState<
    'signup' | 'emailSignup' | 'verificationNeeded'
  >('signup');
  const [verificationEmail, setVerificationEmail] = useState('');

  const showVerificationNeeded = (email: string) => {
    setVerificationEmail(email);
    setPageState('verificationNeeded');
  };

  const renderSignup = () => {
    return (
      <>
        <AuthHero>Create your account</AuthHero>

        <AuthContent>
          <OAuthLogins />
          <Button
            size="auth"
            variant="outline"
            onClick={() => setPageState('emailSignup')}
          >
            Continue with Email
          </Button>
        </AuthContent>

        <AuthFooter>
          <div>
            By signing up, you agree to our{' '}
            <Link href="/readme" className={authLinkClassName}>
              Terms of Service
            </Link>
            .
          </div>
          <div>
            Already have an account?{' '}
            <Link href="/login" className={authLinkClassName}>
              Log in -{'>'}
            </Link>
          </div>
        </AuthFooter>
      </>
    );
  };

  const renderEmailSignup = () => {
    return (
      <>
        <AuthHero>Signup via email</AuthHero>

        <SignupForm onVerificationNeeded={showVerificationNeeded} />

        <AuthFooter>
          <div>
            <AuthTextButton onClick={() => setPageState('signup')}>
              Back to signup
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
          <Link href="/login" className={cn('inline-block', authLinkClassName)}>
            Log in -{'>'}
          </Link>
        </div>
      }
    />
  );

  const renderStep = () => {
    switch (pageState) {
      case 'signup':
        return renderSignup();
      case 'emailSignup':
        return renderEmailSignup();
      case 'verificationNeeded':
        return renderVerificationNeeded();
    }
  };

  return (
    <AuthStepTransition step={pageState}>{renderStep()}</AuthStepTransition>
  );
}

function SignupForm({
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
    z.input<typeof SignupSchema>,
    unknown,
    z.output<typeof SignupSchema>
  >({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.output<typeof SignupSchema>) => {
    setErrorMsg('');

    await signupAction(values).then((res) => {
      if (!res) return;

      if (res.success) {
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
        {...register('name')}
        label="Name"
        error={errors.name?.message}
        type="text"
        placeholder="Enter your name..."
        autoFocus
        autoComplete="name"
        disabled={isSubmitting}
      />

      <AuthField
        {...register('email')}
        label="Email address"
        error={errors.email?.message}
        type="email"
        placeholder="Enter your email address..."
        autoComplete="email"
        disabled={isSubmitting}
      />

      <AuthField
        {...register('password')}
        label="Password"
        error={errors.password?.message}
        type="password"
        placeholder="Enter your password..."
        autoComplete="new-password"
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        size="auth"
        variant="outline"
        isLoading={isSubmitting}
      >
        Sign up
      </Button>

      <AuthErrorMessage message={errorMsg} className="mt-0" />
    </form>
  );
}
