module.exports = {
    name: "ownerHelp",
    description: "Shows the help page for owner commands",
    perm_lvl: "OWNER",
    execute(message, tokens) {
        // Create the base embed
        let msg = embeds.generateEmbed("I'm here to help!", "00ffff");
        msg.addField("Command Invoker:", config.ownerInvoke);

        // Search the command list to find OWNER perm_lvl commands
        let commandFiles = fs.readdirSync("./Modules/Commands/").filter(file => file.endsWith(".js"));
        for (let file of commandFiles) {
            let command = require(`./${file}`);

            // If property perm_lvl == "OWNER", add to embed
            if (command.perm_lvl == "OWNER") {
                msg.addField(command.name, command.description);
            }
        }

        // Output embed
        message.channel.send(msg);
    }
}
