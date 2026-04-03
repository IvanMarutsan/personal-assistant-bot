import type { Context } from "grammy";
import { captureModeLabel, getCaptureMode } from "../bot/capture-mode.js";

export async function handlePendingModeUnsupportedInput(ctx: Context): Promise<void> {
  const telegramUserId = ctx.from?.id;
  if (!telegramUserId) return;

  const mode = getCaptureMode(telegramUserId);
  if (!mode) return;

  if (ctx.message?.text || ctx.message?.voice) return;

  await ctx.reply(
    `Зараз активний режим: ${captureModeLabel(mode)}. Надішли текстове повідомлення або скасуй режим командою /cancel.`
  );
}
