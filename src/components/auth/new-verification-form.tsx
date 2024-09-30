'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Spinner,
} from '@nextui-org/react';

import { newVerificationAction } from '@/actions/auth-actions';
import FormMessage from '@/components/auth/form-message';

function VerificationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const [successMsg, setSuccessMsg] = useState<string | undefined>('');

  const onSubmit = useCallback(async () => {
    if (!token) {
      setErrorMsg('Missing valid token!');
      return;
    }

    await newVerificationAction(token)
      .then((res) => {
        setErrorMsg(res.error);
        setSuccessMsg(res.success);
      })
      .catch(() => {
        setErrorMsg('Something went wrong!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      {!errorMsg && !successMsg && (
        <Spinner label="Confirming your verification..." />
      )}
      <FormMessage type={'error'} message={errorMsg} />
      <FormMessage type={'success'} message={successMsg} />
    </>
  );
}

export default function NewVerificationForm() {
  return (
    <Card className="w-full max-w-md space-y-6 p-6">
      <CardHeader className="w-full">
        <h2 className="text-lg">Verify your email</h2>
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-center">
        <Suspense fallback={<Spinner label="Loading..." />}>
          <VerificationContent />
        </Suspense>
      </CardBody>
      <CardFooter className="flex justify-center">
        <Link href="/login" size="sm">
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
