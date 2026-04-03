import { InlineKeyboard } from "grammy";
import { env } from "../../lib/config.js";
import { MENU_ACTIONS } from "../menu-actions.js";

export function mainKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .webApp("Відкрити застосунок", env.MINI_APP_URL)
    .row()
    .text("Швидка задача", MENU_ACTIONS.QUICK_ADD_TASK)
    .text("Швидка нотатка", MENU_ACTIONS.QUICK_ADD_NOTE)
    .row()
    .text("Інбокс", MENU_ACTIONS.OPEN_INBOX);
}
