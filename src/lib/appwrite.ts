import "server-only";
import { Client, Account } from "node-appwrite";
import getEnv from "./config";

const appwrite_endpoint = getEnv("APPWRITE_ENDPOINT");
const appwrite_project = getEnv("APPWRITE_PROJECT");
const appwrite_key = getEnv("APPWRITE_KEY");

export async function createAdminClient() {
  const client = new Client().setEndpoint(appwrite_endpoint).setProject(appwrite_project).setKey(appwrite_key);
  return {
    get account() {
      return new Account(client);
    },
  };
}
