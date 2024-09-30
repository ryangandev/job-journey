'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiLock } from 'react-icons/ci';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Link,
  Spinner,
} from '@nextui-org/react';

import { newPasswordAction } from '@/actions/auth-actions';
import FormMessage from '@/components/auth/form-message';
import { NewPasswordSchema } from '@/schemas/auth-schema';

function NewPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const [successMsg, setSuccessMsg] = useState<string | undefined>('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setErrorMsg('');
    setSuccessMsg('');

    await newPasswordAction(values, token).then((res) => {
      setErrorMsg(res.error);
      setSuccessMsg(res.success);
    });
  };

  return (
    <>
      <CardHeader className="flex flex-col items-start space-y-4">
        <h2 className="text-xl font-semibold">Enter a new password</h2>
        <FormMessage type="error" message={errorMsg} />
        <FormMessage type="success" message={successMsg} />
      </CardHeader>
      <CardBody className="space-y-4">
        <form
          action={() => {}}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <Input
            {...register('password', { required: true })}
            name="password"
            type="password"
            classNames={{
              label: 'max-h-5', // Restrict label to 1 line
            }}
            endContent={
              <CiLock className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            label={`Password ${
              errors?.password ? `- ${errors?.password?.message}` : ''
            }`}
            placeholder="Enter your password"
            variant="bordered"
            isInvalid={!!errors?.password}
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            color="primary"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Reset Password
          </Button>
        </form>
      </CardBody>
    </>
  );
}

export default function NewPasswordForm() {
  return (
    <Card className="w-full max-w-md p-6">
      <Suspense fallback={<Spinner label="Loading..." />}>
        <NewPasswordContent />
      </Suspense>
      <CardFooter className="flex justify-center">
        <Link href="/login" size="sm" color="primary">
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}
