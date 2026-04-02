import type { Context } from "grammy";
import { captureInboxItem } from "../services/capture.js";

export async function handleVoiceMessage(ctx: Context): Promise<void> {
  const telegramUserId = ctx.from?.id;
  const voiceFileId = ctx.message?.voice?.file_id;

  if (!telegramUserId || !voiceFileId) {
    return;
  }

  const result = await captureInboxItem({
    telegramUserId,
    kind: "voice",
    voiceFileId
  });

  if (!result.accepted) {
    const message =
      result.reason === "user_not_registered"
        ? "Open the Mini App once to complete account setup."
        : "Voice capture placeholder failed.";
    await ctx.reply(message);
    return;
  }

  await ctx.reply(
    "Voice captured. Transcription and AI classification will be added in a later iteration."
  );
}
