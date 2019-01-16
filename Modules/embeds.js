let pfp = "";
class embeds {
    constructor(_pfp) {
        pfp = _pfp;
        console.log("Embeds are now able to be created.");
    }

    // Generate regular embed
    generateEmbed(desc, color) {
        let embed = new Discord.RichEmbed();
        embed.setAuthor(config.name, pfp, config.website)
            .setColor(parseInt(color, 16))
            .setDescription(desc)
            .setFooter(this.randomString(), pfp);
        return embed;
    }

    // Generate error embed
    generateError(code) {
        let embed = new Discord.RichEmbed();
        embed.setAuthor(config.name, pfp, config.website)
            .setDescription("Uh oh, looks like we've encountered an error!")
            .setFooter(this.randomString(), pfp);
        if (errors.hasOwnProperty(code)) {
            embed.setColor(errors[code].color)
                .addField("Error Code:", code, true)
                .addField("Error Description:", errors[code].description);
        } else {
            embed.setColor([255, 0, 0])
                .addField("Error Code:", code, true)
                .addField("Error Description:", "Error unknown!");
        }
        return embed;
    }

    // Generate a random string from strings.json
    randomString() {
        let len = strings.length;
        let index = Math.floor(Math.random() * len);
        let str = strings[index];
        return str;
    }
}

module.exports = embeds;
