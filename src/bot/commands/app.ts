import type { Context } from "grammy";
import { InlineKeyboard } from "grammy";
import { env } from "../../lib/config.js";

export async function handleOpenApp(ctx: Context): Promise<void> {
  await ctx.reply("Відкрий Mini App:", {
    reply_markup: new InlineKeyboard().webApp("Відкрити застосунок", env.MINI_APP_URL)
  });
}
