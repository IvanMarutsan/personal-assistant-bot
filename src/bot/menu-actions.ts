export const MENU_ACTIONS = {
  QUICK_ADD_TASK: "menu:quick_add_task",
  QUICK_ADD_NOTE: "menu:quick_add_note",
  OPEN_INBOX: "menu:open_inbox",
  OPEN_HELP: "menu:open_help",
  CANCEL_CAPTURE: "menu:cancel_capture"
} as const;

export type MenuAction = (typeof MENU_ACTIONS)[keyof typeof MENU_ACTIONS];
