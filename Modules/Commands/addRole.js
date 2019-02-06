module.exports = {
    name: "addRole",
    description: "Adds a role to the user specified",
    perm_lvl: ["OWNER", "STAFF"],
    async execute(message, tokens) {
        // First up, store their role level, no matter if all tokens exist. >:3
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
                usrMention = message.mentions.users.first();
                roleMention = message.mentions.roles.first();
            }

            // Check permission level of the mentioned role
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
                message.guild.member(usrMention).addRole(roleMention, msg);
                message.channel.send(`Role ${roleMention.name} added to ${usrMention.username} successfully!`);
            }
        } catch (e) {
            message.channel.send(embeds.generateError(400)); // Error code: Invalid arguments
            console.log(e);
        }
    },
};
