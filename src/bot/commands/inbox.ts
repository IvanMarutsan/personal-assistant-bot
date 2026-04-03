import type { Context } from "grammy";
import { clearCaptureMode } from "../capture-mode.js";
import { promptInboxCaptureMode } from "../capture-prompts.js";
import { captureInboxItem } from "../../services/capture.js";

export async function handleInbox(ctx: Context): Promise<void> {
  const text = ctx.match?.toString().trim();
  const telegramUserId = ctx.from?.id;

  if (!telegramUserId) {
    await ctx.reply("Не вдалося визначити користувача Telegram.");
    return;
  }

  if (!text) {
    await promptInboxCaptureMode(ctx, telegramUserId);
    return;
  }
  clearCaptureMode(telegramUserId);

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
