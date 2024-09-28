'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { z } from 'zod';

import { getResetPasswordTokenByToken } from '@/data/reset-password-token';
import { getUserByEmail } from '@/data/users';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { signIn, signOut } from '@/lib/auth';
import { prisma } from '@/lib/db';

import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from '@/lib/send-email';
import {
  generateVerificationToken,
  generateResetPasswordToken,
} from '@/lib/tokens';
import {
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  NewPasswordSchema,
} from '@/schemas/auth-schema';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export async function registerAction(
  registerData: z.infer<typeof RegisterSchema>,
) {
  const parsedRegisterData = RegisterSchema.safeParse(registerData);

  if (!parsedRegisterData.success) {
    return { error: 'Invalid data' };
  }

  const { name, email, password } = registerData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Verification Email Sent!' };
}

export async function loginAction(loginData: z.infer<typeof LoginSchema>) {
  const parsedLoginData = LoginSchema.safeParse(loginData);

  if (!parsedLoginData.success) {
    return { error: 'Invalid data' };
  }

  const { email, password } = loginData;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: 'Email does not exist!' };
  } else if (!existingUser.password) {
    return { error: 'Email used with a provider sign in' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: 'Verification Email Sent!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 'Logged in!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return { error: 'Invalid credentials!' };
        }
        default: {
          return { error: 'Something went wrong!' };
        }
      }
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({
    redirectTo: '/login',
  });
}

export async function newVerificationAction(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email, // Update the email when user wants to change their email
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: 'Email verified!' };
}

export const resetPasswordAction = async (
  values: z.infer<typeof ResetPasswordSchema>,
) => {
  const result = ResetPasswordSchema.safeParse(values);

  if (!result.success) {
    return { error: 'Invalid email' };
  }

  const { email } = result.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  if (!existingUser.password) {
    return { error: 'Email used with a provider sign in' };
  }

  const resetPasswordToken = await generateResetPasswordToken(email);

  await sendResetPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token,
  );

  return { success: 'Reset email sent!' };
};

export const newPasswordAction = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Missing token!' };
  }

  const result = NewPasswordSchema.safeParse(values);

  if (!result.success) {
    return { error: 'Invalid password' };
  }

  const { password } = result.data;

  const existingToken = await getResetPasswordTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.resetPasswordToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: 'Password reset!' };
};
