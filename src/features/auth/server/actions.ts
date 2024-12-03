import getEnv from "@/lib/config";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE_NAME } from "../utils/constants";

const getCurrentUserAction = async () => {
  try {
    const client = new Client().setEndpoint(getEnv("APPWRITE_ENDPOINT")).setProject(getEnv("APPWRITE_PROJECT"));

    const cookie = await cookies().get(AUTH_COOKIE_NAME);
    if (!cookie) return null;
    client.setSession(cookie.value);
    const account = new Account(client);
    return await account.get();
  } catch (error) {
    console.error("error while getting current user", error);
    return null;
  }
};

export { getCurrentUserAction };
