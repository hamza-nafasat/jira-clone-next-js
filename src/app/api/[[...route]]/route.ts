import { Hono } from "hono";
import { handle } from "hono/vercel";
import authRoutes from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";

const app = new Hono().basePath("/api");

export const routes = app.route("/auth", authRoutes).route("/workspaces", workspaces);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
