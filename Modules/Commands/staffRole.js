module.exports = {
    name: "staffRole",
    description: "Sets the staff role for the server.",
    perm_lvl: ["OWNER"],
    async execute(message, tokens) {
        if (message.mentions.roles.first() == undefined && tokens.length == 0) {
            channel.send(embeds.generateError(400));
        } else if (message.mentions.roles.first() == undefined) {
            if (roles.hasOwnProperty(tokens[0])) {
                config.staffRole = tokens[0];
                console.log("Staff role updated!");
                message.channel.send("Staff role successfully updated.");
                fs.writeFileSync('./Config/config.json', JSON.stringify(config, null, 4));
            } else {
                message.channel.send(embeds.generateError(404));
            }
        } else {
            let mentionedRole = message.mentions.roles.first();
            config.staffRole = mentionedRole.id;
            console.log("Staff role updated!");
            message.channel.send("Staff role successfully updated.");
            fs.writeFileSync('./Config/config.json', JSON.stringify(config, null, 4));
        }
    },
};
