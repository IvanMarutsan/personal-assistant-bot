import type { Context } from "grammy";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleStart(ctx: Context): Promise<void> {
  await ctx.reply(
    [
      "Welcome to Personal Assistant.",
      "This bot is your quick capture and reminder entry point.",
      "Use the menu below to open the app or send quick items."
    ].join("\n"),
    { reply_markup: mainKeyboard() }
  );
}
