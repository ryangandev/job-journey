import NextAuth, { type DefaultSession } from 'next-auth';
import { UserPlan } from '@prisma/client';

export type ExtendedUser = DefaultSession['user'] & {
  userPlan: UserPlan;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
