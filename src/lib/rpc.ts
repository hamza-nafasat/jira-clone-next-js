import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";
import ENV from "./config";

export const client = hc<AppType>(ENV.APP_URL);
