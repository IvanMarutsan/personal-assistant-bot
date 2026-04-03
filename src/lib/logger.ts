import { env } from "./config.js";

const levels = ["debug", "info", "warn", "error"] as const;
type Level = (typeof levels)[number];

const threshold = levels.indexOf(env.LOG_LEVEL);

function shouldLog(level: Level): boolean {
  return levels.indexOf(level) >= threshold;
}

export const logger = {
  debug: (...args: unknown[]) => {
    if (shouldLog("debug")) console.debug("[debug]", ...args);
  },
  info: (...args: unknown[]) => {
    if (shouldLog("info")) console.info("[info]", ...args);
  },
  warn: (...args: unknown[]) => {
    if (shouldLog("warn")) console.warn("[warn]", ...args);
  },
  error: (...args: unknown[]) => {
    if (shouldLog("error")) console.error("[error]", ...args);
  }
};
