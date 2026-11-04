import NextAuth from 'next-auth';

import authConfig from '@/lib/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  protectedRoutePrefixes,
} from '@/routes';

// Next.js 16 renamed Middleware to Proxy. Proxy always runs on the Node.js
// runtime, so no route segment config (e.g. `runtime`) may be exported here.
const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutePrefixes.some(
    (prefix) =>
      nextUrl.pathname === prefix || nextUrl.pathname.startsWith(`${prefix}/`),
  );

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

  // Protected routes need a session
  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  // Everything else (public pages, unknown paths -> 404) is allowed through
  return;
});

// Optionally, don't invoke Proxy on some paths
// And all routes besides some next static files and images will invoke the proxy
// And from above proxy function we decide what to do with those route regardless of whether they are public or private
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
