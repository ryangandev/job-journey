import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { error: 'Must be at least 8 characters' })
    .max(30, { error: 'Must be within 30 characters' }),
});

export const LoginSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z.string().min(1, { error: 'Password is required' }),
});

export const ResetPasswordSchema = z.object({
  email: z.email({
    error: 'Please enter a valid email address',
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: 'Must be at least 8 characters' })
      .max(30, { error: 'Must be within 30 characters' }),
    confirmPassword: z
      .string()
      .min(1, { error: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords must match',
    path: ['confirmPassword'], // Shows error on confirmPassword field
  });
