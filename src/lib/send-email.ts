import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails
    .send({
      from: 'JobJourney Email Verification<onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email',
      html: `<p>Thanks for using JobJourney. Please use this <a href="${confirmLink}">link</a> to verify your email.</p><p>If the above link does not work, please copy and paste the following link in your browser:</p><p>${confirmLink}</p><br/><p>The verification link will expire in 1 hour. If you did not request this email, please ignore it.</p>`,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails
    .send({
      from: 'JobJourney Reset Password<onboarding@resend.dev>',
      to: email,
      subject: 'Reset your password',
      html: `<p>Thanks for using JobJourney. Please use this <a href="${resetLink}">link</a> to reset your password.</p><p>If the above link does not work, please copy and paste the following link in your browser:</p><p>${resetLink}</p><br/><p>The reset link will expire in 1 hour. If you did not request this email, please ignore it.</p>`,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

export { sendVerificationEmail, sendResetPasswordEmail };
