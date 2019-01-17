module.exports = {
    name: "createEmbed",
    description: "Creates an embed using a description and a hex format colour (minus the 0x identifier).",
    perm_lvl: ["OWNER"],
    execute(message, tokens) {
        if (tokens == undefined) {
            message.channel.send(embeds.generateError(400));
        } else if (tokens.length == 1) {
            message.channel.send(embeds.generateEmbed(tokens[0]));
        } else {
            let msg = "";
            for (let i = 0; i < tokens.length - 1; i++) {
                msg = msg + tokens[i] + " ";
            }
            let e = embeds.generateEmbed(msg, tokens[tokens.length - 1]);
            message.channel.send(e);
        }
    },
}
