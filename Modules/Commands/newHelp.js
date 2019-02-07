module.exports = {
    name: "newHelp",
    description: "New help function (IN PROGRESS!)",
    perm_lvl: ["OWNER", "STAFF", "GENERAL"],
    async execute(message, tokens) {
        let msg = generateEmbed("I'm here to help!", "00ffff");
        let helpLine = "I'm here to help!";

        if (tokens != undefined) {
            if (tokens[0].toLowerCase() == "owner" || tokens[0].toLowerCase() == "staff" || tokens[0].toLowerCase() == "general") {
                msg.addField(helpLine, `${config.website}/${tokens[0].toLowerCase()}.html`);
            } else {
                msg.addField(helpLine, "Website not able to be found using that flag!");
            }
        } else {
            msg.addField(helpLine, `${config.website}/general.html`);
        }
        message.channel.send(msg);
    }
};
