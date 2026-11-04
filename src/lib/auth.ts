import { CredentialsSignin, type DefaultSession } from 'next-auth';

import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { getUserById } from '@/data/users';
import authConfig from '@/lib/auth.config';
import prisma from '@/lib/db';
import { sendVerificationEmail } from '@/lib/send-email';
import {
  generateVerificationToken,
  wasVerificationEmailSentRecently,
} from '@/lib/tokens';

// Adding props to the Session object
declare module 'next-auth' {
  interface Session {
    user: {
      userPlan: 'FREE' | 'PREMIUM';
    } & DefaultSession['user'];
  }
}

// Thrown from the signIn callback when the verification email cannot be sent.
// Auth.js rethrows AuthError subclasses as-is, so loginAction can catch it.
export class VerificationEmailError extends CredentialsSignin {
  code = 'verification_email_failed';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  // Callbacks are asynchronous functions you can use to control what happens when an action is performed
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id || '');

      // Prevent sign in without email verification and send verification email
      if (existingUser?.email && !existingUser?.emailVerified) {
        // Repeated login attempts shouldn't flood the inbox: reuse the email sent moments ago
        if (await wasVerificationEmailSentRecently(existingUser.email)) {
          return false;
        }

        const verificationToken = await generateVerificationToken(
          existingUser.email,
        );

        const emailResult = await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token,
        );

        if (!emailResult.success) throw new VerificationEmailError();

        return false;
      }

      // TODO: Add 2FA check here

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.userPlan && session.user) {
        session.user.userPlan = token.userPlan as 'FREE' | 'PREMIUM';
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.userPlan = existingUser.userPlan;
      return token;
    },
  },
  // Events are asynchronous functions that do not return a response, they are good for audit logs/reporting or handling any other side-effects
  events: {
    // When user signs up with a provider (not credential), their email will be automatically verified
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  session: {
    strategy: 'jwt', // Credential provider only supports JWT https://authjs.dev/getting-started/authentication/credentials
  },
  ...authConfig,
});
