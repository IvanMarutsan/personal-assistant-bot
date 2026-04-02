import type { Context } from "grammy";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleHelp(ctx: Context): Promise<void> {
  await ctx.reply(
    [
      "Available commands:",
      "/start - Open welcome and menu",
      "/menu - Show main action menu",
      "/task <text> - Quick add task",
      "/note <text> - Quick add note",
      "/inbox <text> - Quick inbox capture",
      "/today - Placeholder for 'what should I do now'",
      "/review - Placeholder for daily review"
    ].join("\n"),
    { reply_markup: mainKeyboard() }
  );
}
