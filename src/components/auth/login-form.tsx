'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Link,
} from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

import { LoginSchema } from '../../schemas/auth-schema';
import { loginAction } from '../../actions/auth-actions';
import { LockIcon, MailIcon } from '../../assets/svgs';
import Divider from '../divider';
import FormMessage from './form-message';
import OAuthLogins from './oAuth-logins';

export default function LoginForm() {
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
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log('onSubmit', values);
    setErrorMsg('');
    setSuccessMsg('');

    await loginAction(values).then((res) => {
      if (!res) return;
      setErrorMsg(res.error);
      setSuccessMsg(res.success);
    });
  };

  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader className="flex flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold">Sign in</h2>
          <FormMessage type="error" message={errorMsg || urlError} />
          <FormMessage type="success" message={successMsg} />
        </div>
        <p className="line-clamp-1 text-base text-light-400 dark:text-dark-400">
          to your account
        </p>
      </CardHeader>
      <CardBody className="space-y-4">
        <form
          action={() => {}}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <Input
            {...register('email', { required: true })}
            name="email"
            type="text"
            classNames={{
              label: 'max-h-5', // Restrict label to 1 line
            }}
            endContent={
              <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
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
              <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            label={`Password ${
              errors?.password ? `- ${errors?.password?.message}` : ''
            }`}
            placeholder="Enter your password"
            variant="bordered"
            isInvalid={!!errors?.password}
            autoComplete="off"
          />
          <Link href="/auth/reset-password" size="sm" color="primary">
            Forgot password?
          </Link>
          <Button
            type="submit"
            fullWidth
            color="primary"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Login
          </Button>
        </form>
        <Divider label="or" />
        <OAuthLogins />
      </CardBody>
      <CardFooter className="flex space-x-2 text-sm">
        <span className="line-clamp-1">Need an account?</span>
        <Link href="/auth/register" size="sm" color="primary">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
