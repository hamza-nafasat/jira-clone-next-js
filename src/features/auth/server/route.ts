import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signUpSchema } from "../utils/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE_NAME, COOKIEOPTIONS } from "../utils/constants";

const app = new Hono()
  // login api
  // -------------
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE_NAME, session.secret, COOKIEOPTIONS);
    return c.json({ success: true, message: "Login Successfully" });
  })
  // register api
  // -------------
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { email, name, password } = c.req.valid("json");
    const { account } = await createAdminClient();

    const user = await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE_NAME, session.secret, COOKIEOPTIONS);

    return c.json({ success: true, message: "Registered Successfully", data: user });
  })
  // logout
  // ------
  .post("/logout", async (c) => {
    deleteCookie(c, AUTH_COOKIE_NAME);
    return c.json({ success: true, message: "Logout Successfully" });
  });

export default app;
