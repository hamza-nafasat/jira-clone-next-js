import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";
import getEnv from "./config";

export const client = hc<AppType>(getEnv("NEXT_PUBLIC_APP_URL"));
