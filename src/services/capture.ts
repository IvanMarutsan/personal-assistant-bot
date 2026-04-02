import { logger } from "../lib/logger.js";
import { supabaseAdmin } from "../lib/supabase.js";
import type { CaptureInput, CaptureResult } from "../types/capture.js";

function resolveRawText(input: CaptureInput): string | null {
  if (input.kind === "voice") return null;
  const text = input.text?.trim();
  return text ? text : null;
}

function resolveSource(input: CaptureInput): "text" | "voice" {
  return input.kind === "voice" ? "voice" : "text";
}

export async function captureInboxItem(input: CaptureInput): Promise<CaptureResult> {
  if (!input.telegramUserId) return { mode: "rejected", accepted: false, reason: "invalid_input" };

  if (!supabaseAdmin) {
    return { mode: "stubbed", accepted: true };
  }

  try {
    const { data: userRow, error: userError } = await supabaseAdmin
      .from("users")
      .upsert({ telegram_user_id: input.telegramUserId }, { onConflict: "telegram_user_id" })
      .select("id")
      .single();

    if (userError || !userRow) {
      logger.warn("User upsert failed for capture", {
        telegramUserId: input.telegramUserId,
        userError
      });
      return { mode: "rejected", accepted: false, reason: "error" };
    }

    await supabaseAdmin.from("profiles").upsert(
      {
        user_id: userRow.id
      },
      { onConflict: "user_id" }
    );

    const { data, error } = await supabaseAdmin
      .from("inbox_items")
      .insert({
        user_id: userRow.id,
        source_type: resolveSource(input),
        source_channel: "telegram_bot",
        raw_text: resolveRawText(input),
        transcript_text: null,
        voice_file_id: input.voiceFileId ?? null,
        status: "new",
        meta: { capture_kind: input.kind }
      })
      .select("id")
      .single();

    if (error || !data?.id) {
      logger.error("Failed to store inbox item", error);
      return { mode: "rejected", accepted: false, reason: "error" };
    }

    return { mode: "stored", accepted: true, inboxItemId: data.id };
  } catch (error) {
    logger.error("Unexpected capture error", error);
    return { mode: "rejected", accepted: false, reason: "error" };
  }
}
