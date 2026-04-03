import type { Context } from "grammy";
import { clearCaptureMode } from "../capture-mode.js";
import { promptTaskCaptureMode } from "../capture-prompts.js";
import { captureInboxItem } from "../../services/capture.js";

export async function handleTaskQuickAdd(ctx: Context): Promise<void> {
  const text = ctx.match?.toString().trim();
  const telegramUserId = ctx.from?.id;
  if (!telegramUserId) {
    await ctx.reply("Не вдалося визначити користувача Telegram.");
    return;
  }

  if (!text) {
    await promptTaskCaptureMode(ctx, telegramUserId);
    return;
  }
  clearCaptureMode(telegramUserId);

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

  const suffix =
    result.mode === "stored" ? " Додав у Inbox для подальшого розбору в застосунку." : " Захоплено в режимі scaffold.";
  await ctx.reply(`Готово.${suffix}`);
}
