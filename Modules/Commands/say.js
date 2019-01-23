module.exports = {
    name: "say",
    description: "Makes the bot say something!",
    perm_lvl: ["OWNER", "STAFF"],
    async execute(message, tokens) {
        if (tokens != undefined) {
            let msg = "";
            for (let i = 0; i < tokens.length; i++) {
                msg = msg + tokens[i] + " ";
            }
            message.channel.send(msg);
            message.delete()
            .then (_msg => {
                console.log(`Message successfully deleted in ${message.channel}.`);
            });
        } else {
            message.channel.send(embeds.generateError(400));
        }
    },
};
