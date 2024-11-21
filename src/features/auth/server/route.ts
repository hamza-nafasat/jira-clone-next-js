import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas";

const app = new Hono();

app.post("/login", zValidator("json", loginSchema), (c) => {
  return c.json({
    message: "success",
  });
});

export default app;
