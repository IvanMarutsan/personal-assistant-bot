import type { Context } from "grammy";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleHelp(ctx: Context): Promise<void> {
  await ctx.reply(
    [
      "Головні дії доступні через кнопку Menu внизу чату або через /menu.",
      "",
      "Команди:",
      "/app - Відкрити застосунок",
      "/menu - Показати кнопки дій",
      "/task - Режим швидкої задачі (або /task <текст>)",
      "/note - Режим швидкої нотатки (або /note <текст>)",
      "/inbox - Режим інбоксу (або /inbox <текст>)",
      "/cancel - Скасувати активний режим захоплення",
      "/start - Головний екран бота",
      "/today - Заглушка для «що робити зараз»",
      "/review - Заглушка для щоденного огляду"
    ].join("\n"),
    { reply_markup: mainKeyboard() }
  );
}
