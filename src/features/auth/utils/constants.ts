import { CookieOptions } from "hono/utils/cookie";

const AUTH_COOKIE_NAME: string = "project-manager-auth-token";

const COOKIEOPTIONS: CookieOptions = {
  path: "/",
  sameSite: "strict" as const,
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 24 * 30,
};

export { AUTH_COOKIE_NAME, COOKIEOPTIONS };
