import type { Context } from "grammy";
import { clearCaptureMode, getCaptureMode } from "../bot/capture-mode.js";
import { captureInboxItem } from "../services/capture.js";
import { ingestVoiceWithAi } from "../services/voice-ai.js";
import { env } from "../lib/config.js";

export async function handleVoiceMessage(ctx: Context): Promise<void> {
  const telegramUserId = ctx.from?.id;
  const voiceFileId = ctx.message?.voice?.file_id;
  const voiceDurationSec = ctx.message?.voice?.duration;
  const voiceMimeType = ctx.message?.voice?.mime_type;
  const voiceFileSize = ctx.message?.voice?.file_size;
  const telegramChatId = ctx.chat?.id;
  const telegramMessageId = ctx.message?.message_id;

  if (!telegramUserId || !voiceFileId) {
    return;
  }

  const hadPendingMode = !!getCaptureMode(telegramUserId);
  if (hadPendingMode) {
    clearCaptureMode(telegramUserId);
  }

  if (env.voiceAiEnabled) {
    const aiResult = await ingestVoiceWithAi({
      telegramUserId,
      voiceFileId,
      voiceDurationSec,
      voiceMimeType,
      voiceFileSize,
      telegramChatId,
      telegramMessageId
    });

    if (aiResult.accepted) {
      await ctx.reply(
        hadPendingMode
          ? "Голосове повідомлення збережено. Попередній текстовий режим скасовано, перевір результат у Inbox."
          : "Голосове повідомлення збережено. Я спробував розпізнати зміст — перевір у Inbox."
      );
      return;
    }
  }

  const result = await captureInboxItem({
    telegramUserId,
    kind: "voice",
    voiceFileId
  });

  if (!result.accepted) {
    const message = "Не вдалося обробити голосове повідомлення. Спробуй ще раз за хвилину.";
    await ctx.reply(message);
    return;
  }

  await ctx.reply(
    hadPendingMode
      ? "Голосове повідомлення збережено без AI-розбору. Попередній текстовий режим скасовано."
      : "Голосове повідомлення збережено без AI-розбору. Перевір Inbox."
  );
}
