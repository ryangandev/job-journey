import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { getUserById } from '@/data/users';
import prisma from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  // Callbacks are asynchronous functions you can use to control what happens when an action is performed
  callbacks: {
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
  pages: {
    signIn: '/login',
    error: '/error',
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt', // Credential provider only supports JWT https://authjs.dev/getting-started/authentication/credentials
  },
});
