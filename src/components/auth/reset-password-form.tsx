'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiMail } from 'react-icons/ci';
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

import { resetPasswordAction } from '@/actions/auth-actions';
import CardWrapper from '@/components/auth/card-wrapper';
import FormMessage from '@/components/auth/form-message';
import { ResetPasswordSchema } from '@/schemas/auth-schema';

export default function ResetPasswordForm() {
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const [successMsg, setSuccessMsg] = useState<string | undefined>('');
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
    setSuccessMsg('');

    await resetPasswordAction(values).then((res) => {
      setErrorMsg(res.error);
      setSuccessMsg(res.success);
    });
  };

  return (
    <CardWrapper>
      <CardHeader className="flex flex-col items-start space-y-4">
        <h2 className="text-xl font-semibold">Forgot your password?</h2>
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
          <Button
            type="submit"
            fullWidth
            color="primary"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Send reset email
          </Button>
        </form>
      </CardBody>
      <CardFooter className="flex justify-center">
        <Link href="/login" size="sm" color="primary">
          Back to login
        </Link>
      </CardFooter>
    </CardWrapper>
  );
}
