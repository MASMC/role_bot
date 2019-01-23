module.exports = {
    name: "adminRole",
    description: "Sets the admin role for the server",
    perm_lvl: ["OWNER"],
    async execute(message, tokens) {
        if (message.mentions.roles.first() == undefined && tokens == undefined) {
            message.channel.send(embeds.generateError(400));
        } else if (message.mentions.roles.first() == undefined) {
            if (roles.hasOwnProperty(tokens[0])) {
                config.adminRole = tokens[0];
                console.log("Admin role updated!");
                message.channel.send("Admin role successfully updated.");
                fs.writeFileSync('./Config/config.json', JSON.stringify(config, null, 4)); // Format JSON for outputting
            } else {
                message.channel.send(embeds.generateError(404));
            }
        } else {
            let mentionedRole = message.mentions.roles.first();
            config.adminRole = mentionedRole.id;
            console.log("Admin role updated!");
            message.channel.send("Admin role successfully updated.");
            fs.writeFileSync('./Config/config.json', JSON.stringify(config, null, 4));
        }
    },
};
