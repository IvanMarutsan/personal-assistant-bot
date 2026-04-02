import type { Context } from "grammy";
import { captureInboxItem } from "../../services/capture.js";

export async function handleNoteQuickAdd(ctx: Context): Promise<void> {
  const text = ctx.match?.toString().trim();
  if (!text) {
    await ctx.reply("Usage: /note <your note>");
    return;
  }

  const telegramUserId = ctx.from?.id;
  if (!telegramUserId) {
    await ctx.reply("Could not identify Telegram user.");
    return;
  }

  const result = await captureInboxItem({
    telegramUserId,
    kind: "note",
    text
  });

  if (!result.accepted) {
    const message =
      result.reason === "user_not_registered"
        ? "Open the Mini App once to complete account setup."
        : "Could not capture note right now.";
    await ctx.reply(message);
    return;
  }

  const suffix = result.mode === "stored" ? " Saved to inbox." : " Captured in scaffold mode.";
  await ctx.reply(`Note captured.${suffix}`);
}
