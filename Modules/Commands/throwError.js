module.exports = {
    name: "throwError",
    description: "Throws an error, with optional error code.",
    perm_lvl: "OWNER",
    execute(message, tokens) {
        if (tokens != undefined) {
            message.channel.send(embeds.generateError(tokens[0]));
        } else {
            message.channel.send(embeds.generateError(402));
        }
    },
};
