import ENV from "@/lib/config";
import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { AUTH_COOKIE_NAME } from "../auth/utils/constants";

const getWorkspacesAction = async () => {
  try {
    const client = new Client().setEndpoint(ENV.APPWRITE_ENDPOINT).setProject(ENV.APPWRITE_PROJECT);

    const cookie = await cookies().get(AUTH_COOKIE_NAME);
    if (!cookie) return { documents: [], total: 0 };

    client.setSession(cookie.value);
    const account = new Account(client);
    const databases = new Databases(client);
    const user = await account.get();

    const members = await databases.listDocuments(ENV.DATABASE_ID, ENV.MEMBERS_ID, [Query.equal("userId", user.$id)]);
    if (members.total === 0) return { documents: [], total: 0 };

    const workspaceIds = members.documents.map((member) => member?.workspaceId);
    const workspaces = await databases.listDocuments(ENV.DATABASE_ID, ENV.WORKSPACE_ID, [
      Query.contains("$id", workspaceIds),
    ]);

    return workspaces;
  } catch (error) {
    console.error("error while getting current workspaces", error);
    return { documents: [], total: 0 };
  }
};

export { getWorkspacesAction };
