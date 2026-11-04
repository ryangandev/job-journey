/**
 * Path prefixes that require a signed-in user. Logged-out visitors are sent to /login.
 * Anything that is neither protected nor an auth route is left alone, so unknown paths
 * reach the regular 404 page instead of bouncing to /login.
 * @type {string[]}
 */
export const protectedRoutePrefixes = ['/dashboard'];

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
