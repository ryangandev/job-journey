import NextAuth from 'next-auth';

import authConfig from '@/lib/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

// Next.js 16 renamed Middleware to Proxy. Proxy always runs on the Node.js
// runtime, so no route segment config (e.g. `runtime`) may be exported here.
const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // If it is an API route, we allow it regardless login status
  if (isApiAuthRoute) {
    return;
  }

  // If it is an auth route, we allow it regardless login status
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // If it is not a public route and not logged in, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  // Otherwise, allow all the public routes
  return;
});

// Optionally, don't invoke Proxy on some paths
// And all routes besides some next static files and images will invoke the proxy
// And from above proxy function we decide what to do with those route regardless of whether they are public or private
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
