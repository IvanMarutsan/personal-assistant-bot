import type { Context } from "grammy";
import { clearCaptureMode } from "../capture-mode.js";
import { promptInboxCaptureMode, promptNoteCaptureMode, promptTaskCaptureMode } from "../capture-prompts.js";
import { MENU_ACTIONS } from "../menu-actions.js";
import { mainKeyboard } from "../keyboards/main.js";

export async function handleQuickAddTaskPrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  const userId = ctx.from?.id;
  if (!userId) return;
  await promptTaskCaptureMode(ctx, userId);
}

export async function handleQuickAddNotePrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  const userId = ctx.from?.id;
  if (!userId) return;
  await promptNoteCaptureMode(ctx, userId);
}

export async function handleInboxPrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  const userId = ctx.from?.id;
  if (!userId) return;
  await promptInboxCaptureMode(ctx, userId);
}

export async function handleCancelCaptureMode(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  const userId = ctx.from?.id;
  if (!userId) return;
  clearCaptureMode(userId);
  await ctx.reply("Режим захоплення скасовано.", { reply_markup: mainKeyboard() });
}

export async function handleHelpFromMenu(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    [
      "Головні дії:",
      "• Відкрити застосунок",
      "• Інбокс",
      "• Швидка задача",
      "• Швидка нотатка",
      "• Скасувати"
    ].join("\n"),
    { reply_markup: mainKeyboard() }
  );
}

export const menuActionHandlers = [
  { action: MENU_ACTIONS.QUICK_ADD_TASK, handler: handleQuickAddTaskPrompt },
  { action: MENU_ACTIONS.QUICK_ADD_NOTE, handler: handleQuickAddNotePrompt },
  { action: MENU_ACTIONS.OPEN_INBOX, handler: handleInboxPrompt },
  { action: MENU_ACTIONS.OPEN_HELP, handler: handleHelpFromMenu },
  { action: MENU_ACTIONS.CANCEL_CAPTURE, handler: handleCancelCaptureMode }
] as const;
