module.exports = {
    name: "addRole",
    description: "Adds a role to the user specified",
    perm_lvl: ["OWNER", "STAFF"],
    async execute(message, tokens) {
        message.channel.send("WARNING: Command not fully implemented!\nExpect bugs in the command!");

        // First up, sotre their role level, no matter if all tokens exist. >:3
        let staffLvl = message.member.highestRole.calculatedPosition;

        // Now check for correct number of tokens
        if (tokens.length < 2) {
            message.channel.send(embeds.generateError(400)); // Error code: Invalid arguments
            return;
        }

        try {
            // Let's grab the mentions and store them. The user MUST have "@" before, channel MUST have "#" before
            let usrMention;
            let roleMention;
            if (message.mentions.roles != undefined && message.mentions.users != undefined) {
                usrMention = message.mentions.users.first;
                roleMention = message.mentions.roles.first;

            } // No, I'm not erroring out. This is a try-catch loop, you nerd.

            // Check permission level of the mentioned role
            if (roleMention.position >= staffLvl) {
                message.channel.send(embeds.generateError(403)); // Error code: Unauthorized
            } else {
                message.guild.member(usrMention).addRole(roleMention);
                message.channel.send(`Role ${roleMention.name} added to ${usrMention.username} successfully!`);
            }
        } catch (e) {
            message.channel.send(embeds.generateError(400)); // Error code: Invalid arguments
            console.log(e);
        }
    },
};
