module.exports = {
    name: 'ping',
    description: 'Ping!',
    perm_lvl: ["OWNER", "STAFF", "GENERAL"],
    async execute(message, tokens) {
        message.channel.send('Pong.');
    },
};
