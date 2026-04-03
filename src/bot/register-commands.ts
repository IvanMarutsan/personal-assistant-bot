import type { Bot } from "grammy";
import type { Api } from "grammy";
import { logger } from "../lib/logger.js";

const BOT_COMMANDS: Parameters<Api["setMyCommands"]>[0] = [
  { command: "app", description: "Відкрити застосунок" },
  { command: "inbox", description: "Інбокс: наступний текст у вхідні" },
  { command: "task", description: "Швидка задача (режим або /task текст)" },
  { command: "note", description: "Швидка нотатка (режим або /note текст)" },
  { command: "cancel", description: "Скасувати активний режим" },
  { command: "menu", description: "Показати кнопки дій" },
  { command: "help", description: "Допомога" },
  { command: "start", description: "Головний екран" }
];

export async function registerPersistentMenu(bot: Bot): Promise<void> {
  try {
    await bot.api.setMyCommands(BOT_COMMANDS);
    logger.info("Telegram command menu registered");
  } catch (error) {
    logger.warn("Failed to register Telegram command menu", error);
  }
}
