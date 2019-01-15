module.exports = {
    name: 'shutdown',
    description: 'Shutdown the bot',
    execute(message, tokens) {
        console.log("Bot shutting down gracefully due to command!");
        message.channel.send("Shutting down, check bot online status for success status.").then(msg=>{process.exit(0);});
    },
};
