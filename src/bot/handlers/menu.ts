import type { Context } from "grammy";
import { MENU_ACTIONS } from "../menu-actions.js";

export async function handleQuickAddTaskPrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply("Швидка задача: надішли `/task <що треба зробити>`.", {
    parse_mode: "Markdown"
  });
}

export async function handleQuickAddNotePrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply("Швидка нотатка: надішли `/note <текст нотатки>`.", {
    parse_mode: "Markdown"
  });
}

export async function handleInboxPrompt(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply("Захоплення в інбокс: надішли `/inbox <текст>` або голосове повідомлення.");
}

export const menuActionHandlers = [
  { action: MENU_ACTIONS.QUICK_ADD_TASK, handler: handleQuickAddTaskPrompt },
  { action: MENU_ACTIONS.QUICK_ADD_NOTE, handler: handleQuickAddNotePrompt },
  { action: MENU_ACTIONS.OPEN_INBOX, handler: handleInboxPrompt }
] as const;
