module.exports = {
    name: "help",
    description: "Shows the help page for perm level commands",
    perm_lvl: ["OWNER", "STAFF", "GENERAL"],
    async execute(message, tokens) {
        // Check if tokens are defined, otherwise give an error
        if (tokens == undefined) {
            message.channel.send(embeds.generateError(400));
            return;
        } else {
            // Check if the first token is a valid permission level
            if (tokens[0].toLowerCase() == "owner" || tokens[0].toLowerCase() == "staff" || tokens[0].toLowerCase() == "general") {
                // Create the base embed
                let msg = embeds.generateEmbed("I'm here to help!", "00ffff");

                // Search the command list to find OWNER perm_lvl commands
                let commandFiles = fs.readdirSync("./Modules/Commands/").filter(file => file.endsWith(".js"));
                for (let file of commandFiles) {
                    let command = require(`./${file}`);

                    // If perm_lvl == the first token, add to embed
                    if (command.perm_lvl.includes(tokens[0].toUpperCase())) {
                        msg.addField(command.name, command.description);
                    }
                }

                // Output embed
                message.channel.send(msg);
            } else {
                message.channel.send(embeds.generateError(404));
                return;
            }
        }
    }
}
