'use client';

import { useEffect, useState } from 'react';

import { resendVerificationEmailAction } from '@/actions/auth-actions';
import {
  AuthContent,
  AuthErrorMessage,
  AuthFooter,
  AuthHero,
} from '@/components/auth/auth-components';
import { Button } from '@/components/ui/button';

const RESEND_COOLDOWN_SECONDS = 60;

/**
 * "Please verify your email" screen shown after signup, or after logging in with an
 * unverified account. An email has just been sent when this mounts, so the resend
 * button starts on cooldown.
 */
export default function VerificationNeeded({
  email,
  footer,
}: {
  email: string;
  footer: React.ReactNode;
}) {
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN_SECONDS);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ error?: string; sent?: boolean }>({});

  const isCoolingDown = resendTimer > 0;

  useEffect(() => {
    if (!isCoolingDown) return;

    const timerInterval = setInterval(() => {
      setResendTimer((prevTimer) => Math.max(prevTimer - 1, 0));
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [isCoolingDown]);

  const handleResendEmail = async () => {
    setIsSending(true);
    setStatus({});

    const res = await resendVerificationEmailAction(email);

    setIsSending(false);

    if (res.error) {
      setStatus({ error: res.error });
      return;
    }

    setStatus({ sent: true });
    setResendTimer(RESEND_COOLDOWN_SECONDS);
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
          disabled={isCoolingDown || isSending}
          isLoading={isSending}
        >
          {isCoolingDown
            ? `Resend verification email (${resendTimer}s)`
            : 'Resend verification email'}
        </Button>
        {status.sent && (
          <span className="mt-0 text-xs text-muted-foreground" role="status">
            A new verification email is on its way.
          </span>
        )}
        <AuthErrorMessage message={status.error} className="mt-0" />
      </AuthContent>

      <AuthFooter>{footer}</AuthFooter>
    </>
  );
}
