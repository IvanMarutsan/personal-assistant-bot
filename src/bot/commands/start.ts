import type { Context } from "grammy";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleStart(ctx: Context): Promise<void> {
  await ctx.reply(
    [
      "Вітаю у Personal Assistant.",
      "Цей бот для швидкого захоплення задач, нотаток і голосових повідомлень.",
      "Використай меню нижче, щоб відкрити Mini App або додати запис."
    ].join("\n"),
    { reply_markup: mainKeyboard() }
  );
}
