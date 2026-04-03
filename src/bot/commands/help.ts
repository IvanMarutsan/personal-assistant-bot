import type { Context } from "grammy";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleHelp(ctx: Context): Promise<void> {
  await ctx.reply(
    [
      "Доступні команди:",
      "/start - Привітання і головне меню",
      "/menu - Показати кнопки дій",
      "/task <текст> - Швидко додати задачу",
      "/note <текст> - Швидко додати нотатку",
      "/inbox <текст> - Швидке захоплення в інбокс",
      "/today - Заглушка для «що робити зараз»",
      "/review - Заглушка для щоденного огляду"
    ].join("\n"),
    { reply_markup: mainKeyboard() }
  );
}
