import "server-only";

import { createMiddleware } from "hono/factory";
import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Users as UsersType,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
} from "node-appwrite";
import getEnv from "@/lib/config";
import { getCookie } from "hono/cookie";
import { AUTH_COOKIE_NAME } from "@/features/auth/utils/constants";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

const sessionMiddleware = createMiddleware<AdditionalContext>(async (c, next) => {
  const client = new Client()
    .setEndpoint(getEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT"))
    .setProject(getEnv("NEXT_PUBLIC_APPWRITE_PROJECT"));

  const session = getCookie(c, AUTH_COOKIE_NAME);
  if (!session) return c.json({ error: "Unauthorized" }, { status: 401 });
  client.setSession(session);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);
  const user = await account.get();

  c.set("account", account);
  c.set("databases", databases);
  c.set("storage", storage);
  c.set("user", user);

  return next();
});

export default sessionMiddleware;
