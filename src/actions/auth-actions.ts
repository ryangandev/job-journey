'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { z } from 'zod';

import { getResetPasswordTokenByToken } from '@/data/reset-password-token';
import { getUserByEmail } from '@/data/users';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { signIn, signOut, VerificationEmailError } from '@/lib/auth';
import prisma from '@/lib/db';
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from '@/lib/send-email';
import {
  generateVerificationToken,
  generateResetPasswordToken,
  wasVerificationEmailSentRecently,
} from '@/lib/tokens';
import {
  LoginSchema,
  NewPasswordSchema,
  ResetPasswordSchema,
  SignupSchema,
} from '@/schemas/auth-schema';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export async function signupAction(signupData: z.infer<typeof SignupSchema>) {
  const parsedSignupData = SignupSchema.safeParse(signupData);

  if (!parsedSignupData.success) {
    return { error: 'Invalid data' };
  }

  const { name, email, password } = parsedSignupData.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'The email address you entered is already in use' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  const emailResult = await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  if (!emailResult.success) {
    return {
      error:
        'Your account was created, but we could not send the verification email. Please log in to receive a new one',
    };
  }

  return { success: true };
}

export async function loginAction(loginData: z.infer<typeof LoginSchema>) {
  const parsedLoginData = LoginSchema.safeParse(loginData);

  if (!parsedLoginData.success) {
    return { error: 'Invalid data' };
  }

  const { email, password } = parsedLoginData.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: 'The email address or password you entered is incorrect' };
  } else if (!existingUser.password) {
    return { error: 'Email used with a provider sign in' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof VerificationEmailError) {
      return {
        error:
          'We could not send the verification email. Please try again later',
      };
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            error: 'The email address or password you entered is incorrect',
          };
        }
        case 'AccessDenied': {
          return {
            verificationNeeded: true,
          };
        }
        default: {
          return { error: 'Something went wrong! Please try again' };
        }
      }
    }
    throw error;
  }
}

/**
 * Re-sends the verification email for an unverified credentials account.
 *
 * Unknown, OAuth-only and already-verified addresses get the same success response,
 * so this action can't be used to discover which emails have accounts. Requests within
 * the cooldown window are dropped silently (the client enforces the same cooldown).
 */
export async function resendVerificationEmailAction(email: string) {
  const parsedEmail = z.email().safeParse(email);

  if (!parsedEmail.success) {
    return { error: 'Please enter a valid email address' };
  }

  const existingUser = await getUserByEmail(parsedEmail.data);

  if (
    !existingUser?.email ||
    !existingUser.password ||
    existingUser.emailVerified
  ) {
    return { success: true };
  }

  if (await wasVerificationEmailSentRecently(existingUser.email)) {
    return { success: true };
  }

  const verificationToken = await generateVerificationToken(existingUser.email);
  const emailResult = await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  if (!emailResult.success) {
    return {
      error: 'We could not send the verification email. Please try again later',
    };
  }

  return { success: true };
}

export async function logoutAction() {
  await signOut({
    redirectTo: '/',
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

  return { success: true };
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

  if (existingUser && !existingUser.password) {
    return { error: 'Email used with a provider sign in' };
  }

  if (existingUser && existingUser.password) {
    const resetPasswordToken = await generateResetPasswordToken(email);

    const emailResult = await sendResetPasswordEmail(
      resetPasswordToken.email,
      resetPasswordToken.token,
    );

    if (!emailResult.success) {
      return {
        error: 'We could not send the reset email. Please try again later',
      };
    }
  }

  return { success: true };
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
    return { error: 'This account no longer exists' };
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

  return { success: true };
};
