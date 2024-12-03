import "server-only";
import { Account, Client } from "node-appwrite";
import ENV from "./config";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(ENV.APPWRITE_ENDPOINT)
    .setProject(ENV.APPWRITE_PROJECT)
    .setKey(ENV.APPWRITE_KEY);
  return {
    get account() {
      return new Account(client);
    },
  };
}
