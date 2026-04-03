import type { Context } from "grammy";
import { clearCaptureMode, getCaptureMode } from "../bot/capture-mode.js";
import { captureInboxItem } from "../services/capture.js";

export async function handlePendingTextCapture(ctx: Context): Promise<void> {
  const telegramUserId = ctx.from?.id;
  const text = ctx.message?.text?.trim();

  if (!telegramUserId || !text) return;
  if (text.startsWith("/")) return;

  const mode = getCaptureMode(telegramUserId);
  if (!mode) return;

  const result = await captureInboxItem({
    telegramUserId,
    kind: mode,
    text
  });

  if (!result.accepted) {
    const message =
      result.reason === "user_not_registered"
        ? "Спершу відкрий Mini App один раз, щоб завершити налаштування акаунта."
        : "Не вдалося зберегти повідомлення. Можеш надіслати ще раз або скасувати: /cancel";
    await ctx.reply(message);
    return;
  }

  clearCaptureMode(telegramUserId);

  if (mode === "task") {
    await ctx.reply("Готово. Додав у чергу задач (Inbox) ✅");
    return;
  }
  if (mode === "note") {
    await ctx.reply("Готово. Додав у чергу нотаток (Inbox) ✅");
    return;
  }

  await ctx.reply("Готово. Запис збережено в Inbox ✅");
}
