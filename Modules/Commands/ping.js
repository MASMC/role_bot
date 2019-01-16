module.exports = {
    name: 'ping',
    description: 'Ping!',
    perm_lvl: "GENERAL",
    execute(message, tokens) {
        message.channel.send('Pong.');
    },
};
