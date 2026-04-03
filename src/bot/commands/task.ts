import type { Context } from "grammy";
import { captureInboxItem } from "../../services/capture.js";

export async function handleTaskQuickAdd(ctx: Context): Promise<void> {
  const text = ctx.match?.toString().trim();
  if (!text) {
    await ctx.reply("Використання: /task <що треба зробити>");
    return;
  }

  const telegramUserId = ctx.from?.id;
  if (!telegramUserId) {
    await ctx.reply("Не вдалося визначити користувача Telegram.");
    return;
  }

  const result = await captureInboxItem({
    telegramUserId,
    kind: "task",
    text
  });

  if (!result.accepted) {
    const message =
      result.reason === "user_not_registered"
        ? "Відкрий Mini App один раз, щоб завершити налаштування акаунта."
        : "Не вдалося зберегти задачу зараз.";
    await ctx.reply(message);
    return;
  }

  const suffix = result.mode === "stored" ? " Збережено в інбокс." : " Захоплено в режимі scaffold.";
  await ctx.reply(`Задачу збережено.${suffix}`);
}
