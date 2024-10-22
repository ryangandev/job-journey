import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters' })
    .max(30, { message: 'Must be within 30 characters' }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

// TODO: Add confirm password field later
export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters' })
    .max(30, { message: 'Must be within 30 characters' }),
});
