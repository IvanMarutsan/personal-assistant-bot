import { env } from "../lib/config.js";
import { logger } from "../lib/logger.js";

type VoiceIngestInput = {
  telegramUserId: number;
  voiceFileId: string;
  telegramChatId?: number;
  telegramMessageId?: number;
  voiceDurationSec?: number;
  voiceMimeType?: string;
  voiceFileSize?: number;
};

type VoiceIngestResponse = {
  ok: true;
  inboxItemId: string;
  transcriptStatus: "ok" | "failed";
  parseStatus: "ok" | "failed" | "skipped";
  detectedIntent: "task" | "note" | "meeting_candidate" | "reminder_candidate" | null;
  confidence: number | null;
};

export type VoiceIngestResult =
  | { accepted: true; mode: "stored"; inboxItemId: string }
  | { accepted: true; mode: "stored_fallback" }
  | { accepted: false; reason: "not_configured" | "ingest_failed" };

function resolveEdgeBaseUrl(): string | null {
  if (env.EDGE_BASE_URL) return env.EDGE_BASE_URL.replace(/\/$/, "");
  if (env.SUPABASE_URL) return `${env.SUPABASE_URL.replace(/\/$/, "")}/functions/v1`;
  return null;
}

export async function ingestVoiceWithAi(input: VoiceIngestInput): Promise<VoiceIngestResult> {
  const edgeBaseUrl = resolveEdgeBaseUrl();
  if (!edgeBaseUrl || !env.BOT_INGEST_TOKEN || !env.SUPABASE_ANON_KEY) {
    return { accepted: false, reason: "not_configured" };
  }

  try {
    const response = await fetch(`${edgeBaseUrl}/ingest-voice-telegram`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: env.SUPABASE_ANON_KEY,
        "x-bot-ingest-token": env.BOT_INGEST_TOKEN
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      const message = await response.text();
      logger.warn("Voice AI ingest failed", { status: response.status, message });
      return { accepted: false, reason: "ingest_failed" };
    }

    const body = (await response.json()) as VoiceIngestResponse;
    if (!body?.ok || !body.inboxItemId) {
      return { accepted: false, reason: "ingest_failed" };
    }

    if (body.parseStatus !== "ok") {
      return { accepted: true, mode: "stored_fallback" };
    }

    return { accepted: true, mode: "stored", inboxItemId: body.inboxItemId };
  } catch (error) {
    logger.warn("Voice AI ingest exception", error);
    return { accepted: false, reason: "ingest_failed" };
  }
}

