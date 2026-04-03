import type { Context } from "grammy";
import { clearCaptureMode } from "../capture-mode.js";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleStart(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  if (userId) clearCaptureMode(userId);
  await ctx.reply(
    [
      "Вітаю у Personal Assistant.",
      "Цей бот для швидкого захоплення задач, нотаток і голосових повідомлень.",
      "Кнопка Menu завжди доступна в чаті — відкривай дії без повторного /start."
    ].join("\n"),
    { reply_markup: mainKeyboard() }
  );
}
