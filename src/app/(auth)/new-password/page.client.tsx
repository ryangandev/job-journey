'use client';

import { Link } from 'next-view-transitions';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { newPasswordAction } from '@/actions/auth-actions';
import {
  AuthContent,
  AuthErrorMessage,
  AuthFooter,
  AuthHero,
  authLinkClassName,
} from '@/components/auth/auth-components';
import AuthField from '@/components/auth/auth-field';
import AuthStepTransition from '@/components/auth/auth-step-transition';
import { Button } from '@/components/ui/button';
import { NewPasswordSchema } from '@/schemas/auth-schema';

export default function ClientPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [pageState, setPageState] = useState<
    'newPasswordRequest' | 'completed'
  >('newPasswordRequest');

  const renderNewPasswordRequest = () => {
    return (
      <>
        <AuthHero>What is your new password?</AuthHero>

        <NewPasswordForm token={token} setPageState={setPageState} />

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
        <AuthHero>Password reset completed</AuthHero>

        <AuthContent>
          <p className="text-center text-[13px] text-muted-foreground">
            Your password has been successfully reset. You can now log in with
            your new password.
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
      case 'newPasswordRequest':
        return renderNewPasswordRequest();
      case 'completed':
        return renderCompleted();
    }
  };

  return (
    <AuthStepTransition step={pageState}>{renderStep()}</AuthStepTransition>
  );
}

function NewPasswordForm({
  token,
  setPageState,
}: {
  token: string | null;
  setPageState: React.Dispatch<
    React.SetStateAction<'newPasswordRequest' | 'completed'>
  >;
}) {
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof NewPasswordSchema>,
    unknown,
    z.output<typeof NewPasswordSchema>
  >({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.output<typeof NewPasswordSchema>) => {
    setErrorMsg('');

    await newPasswordAction(values, token).then((res) => {
      if (!res) return;

      if (res.success) {
        setPageState('completed');
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
        {...register('password')}
        label="New password"
        error={errors.password?.message}
        type="password"
        placeholder="Enter a new password..."
        autoFocus
        autoComplete="new-password"
        disabled={isSubmitting}
      />

      <AuthField
        {...register('confirmPassword')}
        label="Confirm new password"
        error={errors.confirmPassword?.message}
        type="password"
        placeholder="Confirm your password..."
        autoComplete="new-password"
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        size="auth"
        variant="outline"
        isLoading={isSubmitting}
      >
        Reset Password
      </Button>

      <AuthErrorMessage message={errorMsg} className="mt-0" />
    </form>
  );
}
