'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiLock, CiMail } from 'react-icons/ci';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Link,
  Spinner,
} from '@nextui-org/react';

import { loginAction } from '@/actions/auth-actions';
import CardWrapper from '@/components/auth/card-wrapper';
import FormMessage from '@/components/auth/form-message';
import OAuthLogins from '@/components/auth/oauth-logins';
import Divider from '@/components/divider';
import { LoginSchema } from '@/schemas/auth-schema';

function LoginContent() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email used with another provider'
      : '';

  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const [successMsg, setSuccessMsg] = useState<string | undefined>('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setErrorMsg('');
    setSuccessMsg('');

    await loginAction(values).then((res) => {
      if (!res) return;
      setErrorMsg(res.error);
      setSuccessMsg(res.success);
    });
  };

  return (
    <>
      <CardHeader className="flex flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold">Sign in</h2>
          <FormMessage type="error" message={errorMsg || urlError} />
          <FormMessage type="success" message={successMsg} />
        </div>
        <p className="line-clamp-1 text-base">to your account</p>
      </CardHeader>
      <CardBody className="space-y-4">
        <form
          action={() => {}}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <Input
            {...register('email', { required: true })}
            name="email"
            type="text"
            classNames={{
              label: 'max-h-5', // Restrict label to 1 line
            }}
            endContent={
              <CiMail className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            label={`Email ${
              errors?.email ? `- ${errors?.email?.message}` : ''
            }`}
            placeholder="Enter your email"
            variant="bordered"
            isInvalid={!!errors?.email}
            autoComplete="on"
            autoFocus
          />
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
          <Link href="/reset-password" size="sm" color="primary">
            Forgot password?
          </Link>
          <Button
            type="submit"
            fullWidth
            color="primary"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Sign in
          </Button>
        </form>
        <Divider label="or" />
        <OAuthLogins />
      </CardBody>
    </>
  );
}

export default function LoginForm() {
  return (
    <CardWrapper>
      <Suspense fallback={<Spinner label="Loading..." />}>
        <LoginContent />
      </Suspense>
      <CardFooter className="flex space-x-2 text-sm">
        <span className="line-clamp-1">Need an account?</span>
        <Link href="/register" size="sm" color="primary">
          Sign up
        </Link>
      </CardFooter>
    </CardWrapper>
  );
}
