import { InlineKeyboard } from "grammy";
import type { Context } from "grammy";
import { captureModeLabel, setCaptureMode } from "./capture-mode.js";
import { MENU_ACTIONS } from "./menu-actions.js";

function cancelKeyboard(): InlineKeyboard {
  return new InlineKeyboard().text("Скасувати", MENU_ACTIONS.CANCEL_CAPTURE);
}

export async function promptTaskCaptureMode(ctx: Context, userId: number): Promise<void> {
  setCaptureMode(userId, "task");
  await ctx.reply(
    `Режим: ${captureModeLabel("task")}.\nНадішли наступне текстове повідомлення — і я збережу його як швидку задачу в Inbox.`,
    { reply_markup: cancelKeyboard() }
  );
}

export async function promptNoteCaptureMode(ctx: Context, userId: number): Promise<void> {
  setCaptureMode(userId, "note");
  await ctx.reply(
    `Режим: ${captureModeLabel("note")}.\nНадішли наступне текстове повідомлення — і я збережу його як швидку нотатку в Inbox.`,
    { reply_markup: cancelKeyboard() }
  );
}

export async function promptInboxCaptureMode(ctx: Context, userId: number): Promise<void> {
  setCaptureMode(userId, "inbox");
  await ctx.reply(
    `Режим: ${captureModeLabel("inbox")}.\nНадішли наступне текстове повідомлення — і я збережу його в Inbox.`,
    { reply_markup: cancelKeyboard() }
  );
}
