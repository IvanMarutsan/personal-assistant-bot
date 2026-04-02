import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  BOT_TOKEN: z.string().min(1),
  MINI_APP_URL: z.string().url(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info")
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  supabaseEnabled: Boolean(parsedEnv.SUPABASE_URL && parsedEnv.SUPABASE_SERVICE_ROLE_KEY)
};
