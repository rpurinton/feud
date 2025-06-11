# Feud Discord App (Node.js Edition)

A real-time Feud-style Discord game app built with Node.js, discord.js, and MySQL. The app uses AI to judge answers in chat and supports multiple worker nodes for robust gameplay.

---

## Features

- Real-time Feud gameplay in Discord channels
- AI-powered answer judging with hints for ambiguous or incorrect answers
- Automatic player participation without explicit join commands
- Persistent game state and player stats stored in MySQL
- Easy command and event handling based on discord.js
- Graceful shutdown and error handling
- Optional systemd service for production deployment
- Localization support for multiple languages

---

## Setup

### 1. Create a Discord Application

- Go to the [Discord Developer Portal](https://discord.com/developers/applications).
- Click "New Application" and give it a name.
- Navigate to "Bot" tab and add a bot user.
- Copy the **Client ID** and **Bot Token** for use in `.env`.

### 2. Create an OpenAI Project

- Visit the [OpenAI Developer Portal](https://platform.openai.com/account/api-keys).
- Create a new API key.
- Store the API key securely for use in `.env`.

### 3. Setup MySQL Database

- Create a new MySQL database and user with appropriate privileges.
- Import `questions.sql` from the project root:

```sh
mysql -u <user> -p <database> < questions.sql
```

### 4. Configure Environment

- Copy the example environment file:

```sh
cp .env.example .env
```

- Edit `.env` with your Discord and OpenAI credentials, database connection info, and other settings.

### 5. Install Dependencies

```sh
npm install
```

### 6. (Optional) Run Tests

```sh
npm test
```

---

## Running the App

### Without systemd (for development)

```sh
node feud.mjs
```

### With systemd (for production)

- Edit the provided `feud.service` file to update paths, user, group, and environment file.
- Copy the service file:

```sh
sudo cp feud.service /etc/systemd/system/feud.service
```

- Reload systemd and enable the service:

```sh
sudo systemctl daemon-reload
sudo systemctl enable feud.service
sudo systemctl start feud.service
sudo systemctl status feud.service
```

---

## Folder Structure

```text
src/
  commands/    # JSON command definitions and JS handlers
  events/      # Discord event handlers
  locales/     # Locale JSON files for translations
  *.mjs       # Core logic files (app startup, commands, events, AI judge)
questions.sql  # SQL file with Feud questions and answers
.env.example  # Sample environment configuration file
feud.service  # systemd service unit file template
```

---

## Best Practices

- Keep your Discord token, OpenAI API key, and database credentials secure; do not commit `.env` to source control.
- Use a dedicated non-root user for running the app in production.
- Regularly back up your MySQL database.
- Use git branches and pull upstream changes regularly if you fork this repo.
- Write and run tests as your app functionality grows.
- Consult the [discord.js documentation](https://discord.js.org/) for up-to-date API usage.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Developer Support

- Email: russell.purinton@gmail.com  
- Github & Discord: rpurinton
