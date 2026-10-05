import nextEnv from "@next/env";
import { parseSiteOrigin } from "../src/lib/site-origin.mjs";

nextEnv.loadEnvConfig(process.cwd());
parseSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL, { release: true });
console.log(
  "Release origin is valid. Confirm domain ownership, hosting privacy facts and commercial terms before publication.",
);
