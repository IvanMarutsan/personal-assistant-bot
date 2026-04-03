export type PendingCaptureMode = "inbox" | "task" | "note";

type PendingCaptureState = {
  mode: PendingCaptureMode;
  setAt: number;
};

const pendingByUserId = new Map<number, PendingCaptureState>();
const MODE_TTL_MS = 1000 * 60 * 20;

export function setCaptureMode(userId: number, mode: PendingCaptureMode): void {
  pendingByUserId.set(userId, { mode, setAt: Date.now() });
}

export function getCaptureMode(userId: number): PendingCaptureMode | null {
  const state = pendingByUserId.get(userId);
  if (!state) return null;
  if (Date.now() - state.setAt > MODE_TTL_MS) {
    pendingByUserId.delete(userId);
    return null;
  }
  return state.mode;
}

export function clearCaptureMode(userId: number): void {
  pendingByUserId.delete(userId);
}

export function captureModeLabel(mode: PendingCaptureMode): string {
  if (mode === "inbox") return "Інбокс";
  if (mode === "task") return "Швидка задача";
  return "Швидка нотатка";
}
