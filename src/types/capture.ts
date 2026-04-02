export type CaptureKind = "task" | "note" | "inbox" | "voice";

export type CaptureInput = {
  telegramUserId: number;
  kind: CaptureKind;
  text?: string;
  voiceFileId?: string;
};

export type CaptureResult =
  | { mode: "stubbed"; accepted: true }
  | { mode: "stored"; accepted: true; inboxItemId: string }
  | { mode: "rejected"; accepted: false; reason: "user_not_registered" | "invalid_input" | "error" };
