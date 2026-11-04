import { Resend, type CreateEmailOptions } from 'resend';

type SendEmailResult = { success: true } | { success: false };

const DEV_APP_URL = 'http://localhost:3000';

let resendClient: Resend | undefined;

// Created lazily: the Resend constructor throws when RESEND_API_KEY is missing,
// which would otherwise crash every module that imports this file.
const getResend = () => {
  resendClient ??= new Resend(process.env.RESEND_API_KEY);
  return resendClient;
};

const getAppUrl = () => {
  const appUrl = process.env.APP_URL?.trim().replace(/\/+$/, '');

  if (appUrl) return appUrl;

  if (process.env.NODE_ENV === 'development') return DEV_APP_URL;

  throw new Error('APP_URL is not set');
};

const buildTokenLink = (pathname: string, token: string) => {
  const url = new URL(`${getAppUrl()}${pathname}`);
  url.searchParams.set('token', token);
  return url.toString();
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Never log the recipient, the token or the link: only what is needed to debug the failure.
const logSendFailure = (kind: string, error: unknown) => {
  const details =
    error && typeof error === 'object'
      ? {
          name: 'name' in error ? error.name : undefined,
          statusCode: 'statusCode' in error ? error.statusCode : undefined,
          message: 'message' in error ? error.message : undefined,
        }
      : { message: String(error) };

  console.error(`[send-email] Failed to send ${kind} email`, details);
};

const sendEmail = async (
  kind: string,
  buildPayload: () => CreateEmailOptions,
): Promise<SendEmailResult> => {
  try {
    const { error } = await getResend().emails.send(buildPayload());

    if (error) {
      logSendFailure(kind, error);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    logSendFailure(kind, error);
    return { success: false };
  }
};

const sendVerificationEmail = async (email: string, token: string) =>
  sendEmail('verification', () => {
    const confirmLink = escapeHtml(buildTokenLink('/new-verification', token));

    return {
      from: 'JobJourney Email Verification<jobjourney@ryangan.me>',
      to: email,
      subject: 'Verify your email',
      html: `<p>Thanks for using JobJourney. Please use this <a href="${confirmLink}">link</a> to verify your email.</p><p>If the above link does not work, please copy and paste the following link in your browser:</p><p>${confirmLink}</p><br/><p>The verification link will expire in 1 hour. If you did not request this email, please ignore it.</p>`,
    };
  });

const sendResetPasswordEmail = async (email: string, token: string) =>
  sendEmail('reset password', () => {
    const resetLink = escapeHtml(buildTokenLink('/new-password', token));

    return {
      from: 'JobJourney Reset Password<jobjourney@ryangan.me>',
      to: email,
      subject: 'Reset your password',
      html: `<p>Thanks for using JobJourney. Please use this <a href="${resetLink}">link</a> to reset your password.</p><p>If the above link does not work, please copy and paste the following link in your browser:</p><p>${resetLink}</p><br/><p>The reset link will expire in 1 hour. If you did not request this email, please ignore it.</p>`,
    };
  });

export type { SendEmailResult };
export { sendVerificationEmail, sendResetPasswordEmail };
