import type { Context } from "grammy";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleMenu(ctx: Context): Promise<void> {
  await ctx.reply("Головне меню дій:", { reply_markup: mainKeyboard() });
}
