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
} from '@/components/auth/auth-components';
import OAuthLogins from '@/components/auth/oauth-logins';
import VerificationNeeded from '@/components/auth/verification-needed';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
            <Link
              href="/readme"
              className="text-accent-foreground underline-offset-2 hover:underline"
            >
              Terms of Service
            </Link>
            .
          </div>
          <div>
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-accent-foreground underline-offset-2 hover:underline"
            >
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
          <div
            className="cursor-pointer transition-colors hover:text-accent-foreground"
            onClick={() => setPageState('signup')}
          >
            Back to signup
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
          <Link
            href="/login"
            className="inline-block text-accent-foreground underline-offset-2 hover:underline"
          >
            Log in -{'>'}
          </Link>
        </div>
      }
    />
  );

  // TODO: Implement animation when switching between rendering
  switch (pageState) {
    case 'signup':
      return renderSignup();
    case 'emailSignup':
      return renderEmailSignup();
    case 'verificationNeeded':
      return renderVerificationNeeded();
  }
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
      className="flex flex-col space-y-[14px] pt-[14px]"
    >
      <div>
        <Input
          {...register('name')}
          className="h-12 placeholder:text-[13px]"
          type="text"
          placeholder="Enter your name..."
          autoFocus
          autoComplete="off"
          disabled={isSubmitting}
        />
        <AuthErrorMessage message={errors.name?.message} />
      </div>

      <div>
        <Input
          {...register('email')}
          className="h-12 placeholder:text-[13px]"
          type="text"
          placeholder="Enter your email address..."
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
        Sign up
      </Button>

      <AuthErrorMessage message={errorMsg} className="mt-0" />
    </form>
  );
}
