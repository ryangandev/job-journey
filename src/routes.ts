/**
 * An array of routes that are publicly accessible.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/new-verification', // User will be able to change their email from the settings page while logged in, so public route is the best place instead of auth route
  '/reset-password',
  '/new-password',
  '/home',
  '/features',
  '/changelog',
  '/pricing',
  '/faqs',
  '/readme',
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to the DEFAULT_LOGIN_REDIRECT path.
 * @type {string[]}
 */
export const authRoutes = ['/login', '/signup', '/error'];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'; // This is a special case so we never block the api/auth routes, it's always allowed

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'; // The default redirect path after logging in
