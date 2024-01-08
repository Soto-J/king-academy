/**
 * An array of routes that are public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/about-us", "/contact"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for all API authentication routes.
 * Routes that start with this prefix will be used for API authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a user logs in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
