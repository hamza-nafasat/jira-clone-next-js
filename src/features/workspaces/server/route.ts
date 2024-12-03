import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../utils/schemas";
import sessionMiddleware from "@/middlewares/session-middleware";
import ENV from "@/lib/config";
import { ID } from "node-appwrite";

const app = new Hono()
  // create new workspace
  // -------------------
  .post("/", zValidator("form", createWorkspaceSchema), sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const storage = c.get("storage");
    const { name, image } = c.req.valid("form");
    let uploadedImageUrl: string | undefined;
    if (image instanceof File) {
      const file = await storage.createFile(ENV.IMAGES_BUCKET_ID, ID.unique(), image);
      const arrayBuffer = await storage.getFilePreview(ENV.IMAGES_BUCKET_ID, file.$id);
      uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    }
    const workspaces = await databases.createDocument(ENV.DATABASE_ID, ENV.WORKSPACE_ID, ID.unique(), {
      name,
      userId: user.$id,
      image: uploadedImageUrl,
    });
    return c.json({ data: workspaces });
  });

export default app;
