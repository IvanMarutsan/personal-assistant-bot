# personal-assistant-bot

Telegram bot scaffold for Personal Assistant V0.

## Setup
1. Copy `.env.example` to `.env`.
2. Set at least `BOT_TOKEN` and `MINI_APP_URL`.
3. Optionally set Supabase values for text capture persistence.
4. For voice AI ingest, set `EDGE_BASE_URL`, `SUPABASE_ANON_KEY`, and `BOT_INGEST_TOKEN`.
5. Install deps: `npm install`.
6. Run in dev: `npm run dev`.

## Menu
- Open App
- Quick Add Task
- Quick Add Note
- Inbox

## Commands
- `/start`
- `/menu`
- `/help`
- `/task <text>`
- `/note <text>`
- `/inbox <text>`
- `/today` (placeholder)
- `/review` (placeholder)

## Notes
- Voice messages use Edge Function ingestion (`ingest-voice-telegram`) when voice AI env vars are configured.
- If Supabase env vars are configured, captures are inserted into `inbox_items`.
- If Supabase env vars are missing, bot runs in scaffold mode and acknowledges capture without persistence.
- Bot capture upserts `users` by `telegram_user_id` so Telegram-first flow works before Mini App login.
