module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, tokens) {
        message.channel.send('Pong.');
    },
};
