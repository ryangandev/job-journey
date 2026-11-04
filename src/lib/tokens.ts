import { v4 as uuidv4 } from 'uuid';

import prisma from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getResetPasswordTokenByEmail } from '@/data/reset-password-token';

const TOKEN_TTL_MS = 3600 * 1000; // 1 hour

/** Minimum time between two verification emails sent to the same address. */
export const VERIFICATION_EMAIL_COOLDOWN_MS = 60 * 1000;

/**
 * Whether a verification email was sent to this address within the cooldown window.
 * Tokens don't store a creation time, so it is derived from the expiry.
 */
export const wasVerificationEmailSentRecently = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  if (!existingToken) return false;

  const createdAt = existingToken.expiresAt.getTime() - TOKEN_TTL_MS;
  return Date.now() - createdAt < VERIFICATION_EMAIL_COOLDOWN_MS;
};

const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return verificationToken;
};

const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await prisma.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const resetPasswordToken = await prisma.resetPasswordToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return resetPasswordToken;
};

export { generateVerificationToken, generateResetPasswordToken };
