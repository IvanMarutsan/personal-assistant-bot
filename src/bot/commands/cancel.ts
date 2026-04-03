import type { Context } from "grammy";
import { clearCaptureMode, getCaptureMode } from "../capture-mode.js";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleCancel(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId) return;

  const mode = getCaptureMode(userId);
  clearCaptureMode(userId);

  if (!mode) {
    await ctx.reply("Активного режиму захоплення немає.", { reply_markup: mainKeyboard() });
    return;
  }

  await ctx.reply("Режим захоплення скасовано.", { reply_markup: mainKeyboard() });
}
