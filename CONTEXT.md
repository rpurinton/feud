@ -0,0 +1,79 @@

# Family Feud Discord Bot - Game Specifications

## Overview

This Discord bot implements a Family Feud-style game using PHP, MySQL, RabbitMQ, and the discord-php library. The bot is designed for real-time play in Discord channels, with AI-powered question and answer judging.

---

## Game Flow & Rules

- **Game Start:**
  - A game is started in a channel with the `!feud` command.
  - Each game is a single round (no multi-round tracking).
  - The bot posts the question and possible answers (hidden) as a Discord embed.

- **Player Participation:**
  - Anyone who types in the channel during an active game is automatically considered a player.
  - No explicit join or answer commands are needed.

- **Answering:**
  - Users submit answers by simply typing in the channel.
  - The AI acts as a judge, evaluating if the user's input matches a top answer, is too broad/ambiguous, or is incorrect.
  - If the answer is correct, the AI returns the matched answer number; if too broad or ambiguous, the AI instructs the user to be more specific; if wrong, the answer is marked incorrect.

- **Scoring:**
  - Correct answers grant the user the answer's point value.
  - Incorrect answers deduct 1 point from the user.

- **Game End:**
  - The game ends when all answers are found, or after a 2-minute timeout following the last correct answer.
  - When the game ends, the bot reveals any missed answers and displays player scores in an embed.

- **Timeout Logic:**
  - After each correct answer, a 2-minute timer starts (implemented as a blocking sleep/check loop in the worker that processed the answer).
  - The timer checks the database every 5 seconds for new correct answers. If a new answer is found, the timer exits and is reset by the next correct answer.
  - If no new answers are found after 2 minutes, the game ends automatically.

- **Commands:**
  - `!feud` — Starts a new game in the channel (if one isn't already running).
  - `!stats` — Returns user stats (lifetime, top scores, etc.).
  - All other messages during a game are treated as answer attempts.

- **Game Display:**
  - The main game display is a Discord embed showing the question, revealed answers, player scores, and time left.

- **Persistence:**
  - All game state and stats are stored in MySQL for persistence and recovery.

---

## Technical Architecture

- **App.php:** Single instance, handles Discord I/O, shuttles messages via RabbitMQ.
- **Inbox.php:** Multiple worker instances, each with its own event loop, consuming from the queue and running game logic.
- **Game Timer:** Only the worker that processed the last correct answer runs the timer (blocking sleep/check loop). If the worker crashes, the timer is reset by the next correct answer.

---

## AI Judge

- The AI is prompted to act as a judge:
  - Decides if a user's input is substantially close enough to a top answer.
  - If the input is too broad or matches multiple answers, the AI instructs the user to be more specific.
  - If the input is wrong, the AI marks it as incorrect.
  - The AI returns the matched answer number or feedback as appropriate.

---

## SQL Schema (to be derived from code)

- The database schema will be derived from the code implementation to ensure consistency and avoid unnecessary updates.

---

## Additional Notes

- No slash commands are used; only `!commands` in chat.
- The bot is designed for robust, distributed operation with multiple worker nodes.
- All state and logic are designed for persistence and recovery.
