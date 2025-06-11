import log from '../log.mjs';

// Command handler for /help
export default async function (interaction) {
    try {
        const helpContent = '**Feud Help**\n\n' +
            'Welcome to the Feud App! Here are some commands you can use:\n\n' +
            '**/feud** - Start a new round of feud.\n' +
            '**/stats** - Check your current stats.\n' +
            '**/leaderboard** - View the leaderboard.\n' +
            '**/help** - Show this help message.\n\n' +
            'For more information, visit our official [Support Discord]().';
        await interaction.reply({
            content: helpContent,
            flags: 1 << 6, // EPHEMERAL
        });
    } catch (err) {
        log.error("Error in /help handler", err);
    }
}
