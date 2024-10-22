'use client';

import { Link } from 'next-view-transitions';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { resetPasswordAction } from '@/actions/auth-actions';
import {
  AuthContent,
  AuthErrorMessage,
  AuthFooter,
  AuthHero,
} from '@/components/auth/auth-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResetPasswordSchema } from '@/schemas/auth-schema';

export default function ClientPage() {
  const [pageState, setPageState] = useState<'emailRequest' | 'emailSent'>(
    'emailRequest',
  );

  const renderEmailRequest = () => {
    return (
      <>
        <AuthHero>What is your email address?</AuthHero>

        <ResetPasswordForm setPageState={setPageState} />

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
        <AuthHero>A reset email has been sent</AuthHero>

        <AuthContent className="space-y-6 text-center">
          <p className="text-[13px] text-muted-foreground">
            If an account with that email exists, we&apos;ve sent a password
            reset link to your inbox.
          </p>

          <p className="text-[13px] text-muted-foreground">
            Please check your email and follow the instructions to reset your
            password.
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
    case 'emailRequest':
      return renderEmailRequest();
    case 'emailSent':
      return renderVerificationNeeded();
  }
}

function ResetPasswordForm({
  setPageState,
}: {
  setPageState: React.Dispatch<
    React.SetStateAction<'emailRequest' | 'emailSent'>
  >;
}) {
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setErrorMsg('');

    await resetPasswordAction(values).then((res) => {
      if (!res) return;

      if (res.success) {
        setPageState('emailSent');
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

      <Button
        type="submit"
        size="auth"
        variant="outline"
        isLoading={isSubmitting}
      >
        Send reset email
      </Button>

      <AuthErrorMessage message={errorMsg} />
    </form>
  );
}
