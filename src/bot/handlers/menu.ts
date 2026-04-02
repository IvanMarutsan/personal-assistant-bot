import type { Context } from "grammy";
import { MENU_ACTIONS } from "../menu-actions.js";

export async function handleQuickAddTaskPrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply("Quick Add Task: send `/task <what needs to be done>`.", {
    parse_mode: "Markdown"
  });
}

export async function handleQuickAddNotePrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply("Quick Add Note: send `/note <your note>`.", {
    parse_mode: "Markdown"
  });
}

export async function handleInboxPrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply("Inbox capture: send `/inbox <text>` or drop a voice message.");
}

export const menuActionHandlers = [
  { action: MENU_ACTIONS.QUICK_ADD_TASK, handler: handleQuickAddTaskPrompt },
  { action: MENU_ACTIONS.QUICK_ADD_NOTE, handler: handleQuickAddNotePrompt },
  { action: MENU_ACTIONS.OPEN_INBOX, handler: handleInboxPrompt }
] as const;
