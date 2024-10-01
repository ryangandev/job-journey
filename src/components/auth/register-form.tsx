'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiLock, CiMail, CiUser } from 'react-icons/ci';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Link,
} from '@nextui-org/react';

import { registerAction } from '@/actions/auth-actions';
import CardWrapper from '@/components/auth/card-wrapper';
import Divider from '@/components/divider';
import FormMessage from '@/components/auth/form-message';
import OAuthLogins from '@/components/auth/oauth-logins';
import { RegisterSchema } from '@/schemas/auth-schema';

export default function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const [successMsg, setSuccessMsg] = useState<string | undefined>('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setErrorMsg('');
    setSuccessMsg('');

    await registerAction(values).then((res) => {
      setErrorMsg(res.error);
      setSuccessMsg(res.success);
    });
  };

  return (
    <CardWrapper>
      <CardHeader className="flex flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold">Sign up</h2>
          <FormMessage type="error" message={errorMsg} />
          <FormMessage type="success" message={successMsg} />
        </div>
        <p className="line-clamp-1 text-base">to create an account</p>
      </CardHeader>
      <CardBody className="space-y-4">
        <form
          action={() => {}}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <Input
            {...register('name', { required: true })}
            name="name"
            type="text"
            classNames={{
              label: 'max-h-5', // Restrict label to 1 line
            }}
            endContent={
              <CiUser className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            label={`Name ${errors?.name ? `- ${errors?.name?.message}` : ''}`}
            placeholder="Enter your name"
            variant="bordered"
            isInvalid={!!errors?.name}
            autoComplete="off"
            autoFocus
          />
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
            autoComplete="off"
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
          <Button
            type="submit"
            fullWidth
            color="primary"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Create an account
          </Button>
        </form>
        <Divider label="or" />
        <OAuthLogins />
      </CardBody>
      <CardFooter className="flex space-x-2 text-sm">
        <span className="line-clamp-1">Already have an account?</span>
        <Link href="/login" size="sm" color="primary">
          Login
        </Link>
      </CardFooter>
    </CardWrapper>
  );
}
