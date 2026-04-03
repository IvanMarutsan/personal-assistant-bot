import { Bot } from "grammy";
import { env } from "./lib/config.js";
import { logger } from "./lib/logger.js";
import { handleStart } from "./bot/commands/start.js";
import { handleHelp } from "./bot/commands/help.js";
import { handleOpenApp } from "./bot/commands/app.js";
import { handleCancel } from "./bot/commands/cancel.js";
import { handleInbox } from "./bot/commands/inbox.js";
import { handleTaskQuickAdd } from "./bot/commands/task.js";
import { handleNoteQuickAdd } from "./bot/commands/note.js";
import { handleMenu } from "./bot/commands/menu.js";
import { registerPersistentMenu } from "./bot/register-commands.js";
import { menuActionHandlers } from "./bot/handlers/menu.js";
import { handlePendingModeUnsupportedInput } from "./handlers/pending-mode-unsupported.js";
import { handlePendingTextCapture } from "./handlers/text-capture.js";
import { handleVoiceMessage } from "./handlers/voice.js";

const bot = new Bot(env.BOT_TOKEN);

bot.command("start", handleStart);
bot.command("help", handleHelp);
bot.command("app", handleOpenApp);
bot.command("menu", handleMenu);
bot.command("cancel", handleCancel);
bot.command("task", handleTaskQuickAdd);
bot.command("note", handleNoteQuickAdd);
bot.command("inbox", handleInbox);

bot.command("today", async (ctx) => {
  await ctx.reply("V0 placeholder: this will suggest what to do now based on your queue and constraints.");
});

bot.command("review", async (ctx) => {
  await ctx.reply("V0 placeholder: daily review flow will be added here.");
});

for (const menuAction of menuActionHandlers) {
  bot.callbackQuery(menuAction.action, menuAction.handler);
}

bot.on(":voice", handleVoiceMessage);
bot.on("message:text", handlePendingTextCapture);
bot.on("message", handlePendingModeUnsupportedInput);

bot.catch((error) => {
  logger.error("Bot runtime error", error.error);
});

bot.start({
  onStart: async (info) => {
    await registerPersistentMenu(bot);
    logger.info(`Bot started as @${info.username}`);
  }
});
