import type { Context } from "grammy";
import { captureInboxItem } from "../../services/capture.js";

export async function handleInbox(ctx: Context): Promise<void> {
  const text = ctx.match?.toString().trim();

  if (!text) {
    await ctx.reply("Використання: /inbox <що потрібно запам'ятати>");
    return;
  }

  const telegramUserId = ctx.from?.id;
  if (!telegramUserId) {
    await ctx.reply("Не вдалося визначити користувача Telegram.");
    return;
  }

  const result = await captureInboxItem({
    telegramUserId,
    kind: "inbox",
    text
  });

  if (!result.accepted) {
    const message =
      result.reason === "user_not_registered"
        ? "Відкрий Mini App один раз, щоб завершити налаштування акаунта."
        : "Не вдалося зберегти запис. Спробуй ще раз через хвилину.";
    await ctx.reply(message);
    return;
  }

  const suffix = result.mode === "stored" ? " Збережено в інбокс." : " Захоплено в режимі scaffold.";
  await ctx.reply(`Готово.${suffix}`);
}
