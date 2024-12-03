import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";
import getEnv from "./config";

export const client = hc<AppType>(getEnv("APP_URL"));
