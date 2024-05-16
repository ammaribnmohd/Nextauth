/**
 * *an array of routes that are accessible to the public 
 * these routes dont req authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    //"/auth/new-verification"
];

/*
 * *an array of routes that are used for auth 
 * these routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    //"/auth/reset",
];

/**
 * *the prefix for api auth routes
 * routes that start with this prefix are used for api auth purposes
 * @type {string[]}
 */
export const apiAuthPrefix= "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";