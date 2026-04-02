import { InlineKeyboard } from "grammy";
import { env } from "../../lib/config.js";
import { MENU_ACTIONS } from "../menu-actions.js";

export function mainKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .webApp("Open App", env.MINI_APP_URL)
    .row()
    .text("Quick Add Task", MENU_ACTIONS.QUICK_ADD_TASK)
    .text("Quick Add Note", MENU_ACTIONS.QUICK_ADD_NOTE)
    .row()
    .text("Inbox", MENU_ACTIONS.OPEN_INBOX);
}
