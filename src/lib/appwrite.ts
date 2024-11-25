import "server-only";
import { Client, Account } from "node-appwrite";
import getEnv from "./config";

const appwrite_endpoint = getEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT");
const appwrite_project = getEnv("NEXT_PUBLIC_APPWRITE_PROJECT");
const appwrite_key = getEnv("NEXT_APPWRITE_KEY");
console.log(appwrite_endpoint, appwrite_project, appwrite_key);

export async function createAdminClient() {
  const client = new Client().setEndpoint(appwrite_endpoint).setProject(appwrite_project).setKey(appwrite_key);
  return {
    get account() {
      return new Account(client);
    },
  };
}
