module.exports = {
    name: "removeRole",
    description: "Removes a role from a user",
    perm_lvl: ["OWNER", "STAFF"],
    async execute(message, tokens) {
        // First up, store the staff role level
        let staffLvl = message.member.highestRole.calculatedPosition;

        // Check for token number
        if (tokens.length < 2) {
            message.channel.send(embeds.generateError(400)); // Error code: Invalid arguments
            return;
        }

        try {
            // Let's grab mentions and store them
            let usrMention;
            let roleMention;
            if (message.mentions.roles != undefined && message.mentions.users != undefined) {
                ustMention = message.mentions.users.first();
                roleMention = message.mentions.roles.first();
            }

            // Check perm levels
            if ((roleMention.position >= staffLvl || roleMention.position >= message.guild.member(client.user.id).highestRole.calculatedPosition)) {
                message.channel.send(embeds.generateError(403)); // Error code: Unauthorized
            } else {
                let msg = `[${message.author.username}#${message.author.discriminator}] `;
                for (let i = 0; i < tokens.length; i++) {
                    if (tokens[i] == "-r") {
                        for (let j = i + 1; j < tokens.length; j++) {
                            msg = msg + `${tokens[j]} `;
                        }
                    }
                }
                message.guild.member(usrMention).removeRole(roleMention, msg);
                message.channel.send(`Role ${roleMention.name} removed from ${usrMention.username} successfully!`;
            }
        } catch (e) {
            message.channel.send(embeds.generateError(400)); // Error code: Invalid arguments
            console.log(e);
        }
    },
};
