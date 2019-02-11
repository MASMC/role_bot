module.exports = {
    name: "help",
    description: "Gives a link to the website, which has commands listed.",
    perm_lvl: ["OWNER", "STAFF", "GENERAL"],
    async execute(message, tokens) {
        let msg = embeds.generateEmbed("I'm here to help!", "00ffff");
        let helpLine = "Find help on the website:";
        let website = config.website + "/commands/";

        if (tokens.length != 0) {
            if (tokens[0].toLowerCase() == "owner" || tokens[0].toLowerCase() == "staff" || tokens[0].toLowerCase() == "general") {
                msg.addField(helpLine, `${website}${tokens[0].toLowerCase()}.html`);
            } else {
                msg.addField(helpLine, "Website not able to be found using that flag!");
            }
        } else {
            msg.addField(helpLine, `${website}general.html`);
        }
        message.channel.send(msg);
    }
};
