import { z } from 'zod';

const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters' })
    .max(30, { message: 'Must be within 30 characters' }),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
});

const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

// TODO: Add confirm password field later
const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters' })
    .max(30, { message: 'Must be within 30 characters' }),
});

export { RegisterSchema, LoginSchema, ResetPasswordSchema, NewPasswordSchema };
