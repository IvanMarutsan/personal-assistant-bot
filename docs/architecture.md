# personal-assistant-bot architecture (V0)

## Purpose
Telegram entry point for capture and reminders. Keep logic thin; business logic belongs in Supabase Edge Functions.

## V0 responsibilities
- /start command
- Main menu (open app, task, note, inbox)
- /inbox, /task, /note quick capture
- Voice intake placeholder (store file id)

## V1+ direction
- reminder scheduling via Supabase cron
- push task suggestions back to Telegram
- transcribe voice and auto-triage inbox items via edge function
