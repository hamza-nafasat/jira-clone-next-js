import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signUpSchema } from "../utils/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE_NAME, COOKIEOPTIONS } from "../utils/constants";
import sessionMiddleware from "@/middlewares/session-middleware";

const app = new Hono()

  // get current user
  // -----------------

  .get("/current", sessionMiddleware, async (c) => {
    const user = c.get("user");
    return c.json({ data: user });
  })

  // register user
  // -------------

  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { email, name, password } = c.req.valid("json");
    const { account } = await createAdminClient();
    const user = await account.create(ID.unique(), email, password, name);
    if (!user) return c.json({ error: "User already exists" }, { status: 400 });
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE_NAME, session.secret, COOKIEOPTIONS);
    return c.json({ data: user }, { status: 201 });
  })

  // login user
  // ----------

  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE_NAME, session.secret, COOKIEOPTIONS);
    return c.json({ message: "Login Successfully" }, { status: 200 });
  })

  // logout
  // ------

  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");
    deleteCookie(c, AUTH_COOKIE_NAME);
    account.deleteSession("current");
    return c.json({ message: "Logout Successfully" }, { status: 200 });
  });

export default app;
