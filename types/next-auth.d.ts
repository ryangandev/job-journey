import type { DefaultSession } from 'next-auth';

// Adding props to the Session object
declare module 'next-auth' {
  interface Session {
    user: {
      userPlan: 'FREE' | 'PREMIUM';
    } & DefaultSession['user'];
  }
}
