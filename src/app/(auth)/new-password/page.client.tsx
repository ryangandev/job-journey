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
} from '@/components/auth/auth-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NewPasswordSchema } from '@/schemas/auth-schema';

export default function ClientPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [pageState, setPageState] = useState<
    'newPasswordRequest' | 'completed'
  >('newPasswordRequest');

  const renderEmailRequest = () => {
    return (
      <>
        <AuthHero>What is your new password?</AuthHero>

        <NewPasswordForm token={token} setPageState={setPageState} />

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
        <AuthHero>Password reset completed</AuthHero>

        <AuthContent>
          <p className="text-center text-[13px] text-muted-foreground">
            Your password has been successfully reset. You can now log in with
            your new password.
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
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
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
      className="flex flex-col space-y-[14px] pt-[14px]"
    >
      <div>
        <Input
          {...register('password')}
          className="h-12 placeholder:text-[13px]"
          type="password"
          placeholder="Enter a new password..."
          autoFocus
          autoComplete="off"
          disabled={isSubmitting}
        />
        <AuthErrorMessage message={errors.password?.message} />
      </div>

      <div>
        <Input
          {...register('confirmPassword')}
          className="h-12 placeholder:text-[13px]"
          type="password"
          placeholder="Confirm your password..."
          autoFocus
          autoComplete="off"
          disabled={isSubmitting}
        />
        <AuthErrorMessage message={errors.confirmPassword?.message} />
      </div>

      <Button
        type="submit"
        size="auth"
        variant="outline"
        isLoading={isSubmitting}
      >
        Reset Password
      </Button>

      <AuthErrorMessage message={errorMsg} />
    </form>
  );
}
