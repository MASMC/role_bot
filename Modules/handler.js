// Message handler

// Global constants
const pfp = "";
const dataPath = "./Data/";
const configPath = "./Config/";

// Embed template
const embedTemplate = new Discord.RichEmbed();
embedTemplate.setAuthor(config.name, pfp, config.website)
    .setFooter(randomString(), pfp);

class handler {
    constructor() {
        console.log("Handler initialized and awaiting messages.");
    }

    handle(message) {
        // Message things, to allow easier typing
        let content = message.content;
        let author = message.author;
        let channel = message.channel;
        let guild = message.guild;
        let member = message.member;

        // Begin checking the first characters
        if (author.id != client.user.id) {
            if (content.substring(0, 2) == "!/") {
                if (author.id == guild.owner.id) {
                    handleOwner(message);
                } else {
                    channel.send(generateError(403));
                }
            } else if (content.substring(0, 1) == "!") {
                let data = member.roles.array();
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == config.staffRole || data[i].id == config.adminRole) {
                        handleStaff(message);
                        return;
                    }
                }
                channel.send(generateError(403));
            } else if (content.substring(0, 1) == "/") {
                handleReg(message);
            }
        }
    }
}

// Owner only commands
function handleOwner(message) {
    // Ease of typing message variables
    let content = message.content;
    let author = message.author;
    let channel = message.channel;
    let guild = message.guild;
    let member = message.member;

    // Let's find a space, or the end of line. Whichever comes first.
    let command;
    let tokens;
    let firstSpace = content.indexOf(' ');
    if (firstSpace == -1) {
        command = content;
    } else {
        command = content.substring(0, firstSpace);
        tokens = content.substring(++firstSpace).split(' ');
    }

    // Make sure to log the command!
    console.log(`${author.username} (${author.id}) invoked owner-level command ${command} with tokens [${tokens}]`);

    // Commands
    if (command == "!/ownerHelp") {
        let msg = generateEmbed("I'm here to help!", "00ffff");
        msg.addField("!/throwError", "Throws a test error embed. Optional error ID after command.", true)
            .addField("!/createEmbed", "Creates a test embed. Optional description and color.", true)
            .addField("!/populateRoles", "Populates the role list (`./Data/roles.json`).", true)
            .addField("!/viewRoles", "View the role list.", true)
            .addField("!/viewConfigs", "View the config file.", true)
            .addField("!/adminRole", "Set the admin role.", true)
            .addField("!/staffRole", "Set the staff role.", true);
        channel.send(msg);
    } else if (command == "!/throwError") {
        if (tokens != undefined) {
            channel.send(generateError(tokens[0]));
        } else {
            channel.send(generateError(402));
        }
    } else if (command == "!/createEmbed") {
        if (tokens == undefined) {
            channel.send(generateError(400));
        } else if (tokens.length = 1) {
            channel.send(generateEmbed(tokens[0]));
        } else {
            let msg = "";
            for (let i = 1; i < tokens.length - 1; i++) {
                msg = msg + tokens[i] + " ";
            }
            channel.send(generateEmbed(msg, tokens[tokens.length - 1]));
        }
    } else if (command == "!/populateRoles") {
        let data = message.guild.roles.array();
        let ids = [];
        let names = [];
        for (let i = 1; i < data.length; i++) {
            ids.push(data[i].toString().replace(/[^\d]/g, "")); // RegEx: Not digit, global flag
            let role = message.guild.roles.get(ids[i - 1]);
            names.push(role.name);
            roles[ids[i - 1]] = names[i - 1];
        }
        let toStr = JSON.stringify(roles, null, 4); // Formats JSON file for roles
        fs.writeFile(dataPath + 'roles.json', "{", err => {
            fs.writeFile(dataPath + 'roles.json', toStr, err => {
                console.log;
            });
        });
        console.log("Roles populated.");
        channel.send("Done populating roles. Use `!/viewRoles` for confirmation of names.");
    } else if (command == "!/viewRoles") {
        channel.send("```JSON\n" + JSON.stringify(roles, null, 4) + "\n```"); // Formats JSON file for outputting
    } else if (command == "!/viewConfigs") {
        channel.send("```JSON\n" + JSON.stringify(config, null, 4) + "\n```"); // Formats JSON file for outputting
    } else if (command == "!/adminRole") {
        if (message.mentions.roles.first() == undefined && tokens == undefined) {
            channel.send(generateError(400));
        } else if (message.mentions.roles.first() == undefined) {
            if (roles.hasOwnProperty(tokens[0])) {
                config.adminRole = tokens[0];
                console.log("Admin role updated!");
                channel.send("Admin role successfully updated.");
                fs.writeFileSync(configPath + 'config.json', JSON.stringify(config, null, 4)); // Format JSON for outputting
            } else {
                channel.send(generateError(404));
            }
        } else {
            let mentionedRole = message.mentions.roles.first();
            config.adminRole = mentionedRole.id;
            console.log("Admin role updated!");
            channel.send("Admin role successfully updated.");
            fs.writeFileSync(configPath + 'config.json', JSON.stringify(config, null, 4));
        }
    } else if (command == "!/staffRole") {
        if (message.mentions.roles.first() == undefined && tokens == undefined) {
            console.log("staffrole");
            channel.send(generateError(400));
        } else if (message.mentions.roles.first() == undefined) {
            if (roles.hasOwnProperty(tokens[0])) {
                config.staffRole = tokens[0];
                console.log("Staff role updated!");
                channel.send("Staff role successfully updated.");
                fs.writeFileSync(configPath + 'config.json', JSON.stringify(config, null, 4));
            } else {
                channel.send(generateError(404));
            }
        } else {
            let mentionedRole = message.mentions.roles.first();
            config.staffRole = mentionedRole.id;
            console.log("Staff role updated!");
            channel.send("Staff role successfully updated.");
            fs.writeFileSync(configPath + 'config.json', JSON.stringify(config, null, 4));
        }
    } else {
        channel.send(generateError(404));
    }
}

// Staff/Admin only commands
function handleStaff(message) {
    // Message properties, allowing easier typing
    let content = message.content;
    let channel = message.channel;
    let member = message.member;
    let author = message.author;
    let guild = message.guild;

    // Grab their roles, see if they're admin or owner of the guild
    let admin = false;
    if (author.id == guild.owner.id) {
        admin = true;
    } else {
        let data = member.roles.array();
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == config.adminRole) {
                admin = true;
            }
        }
    }

    // Find the first space, or the end of line
    let command;
    let tokens;
    let firstSpace = content.indexOf(' ');
    if (firstSpace == -1) {
        command = content;
    } else {
        command = content.substring(0, firstSpace);
        tokens = content.substring(++firstSpace).split(' ');
    }

    // Make sure to log the command!
    console.log(`${author.username} (${author.id}) invoked command ${command} with tokens [${tokens}]`);

    // Commands
    if (command == "!modHelp") {
        let msg = generateEmbed("I'm here to help!", "00ffff");
        msg.addField("!say", "Allows the bot to \"say\" something.", true);
        channel.send(msg);
    } else if (command == "!say") {
        if (tokens != undefined) {
            let msg = "";
            for (let i = 0; i < tokens.length; i++) {
                msg = msg + tokens[i] + " ";
            }
            channel.send(msg);
            message.delete()
            .then (_msg => {
                console.log(`Message successfully deleted in ${channel}.`);
            });
        } else if () {

        } else {
            channel.send(generateError(400));
        }
    }
}

// Regular commands
function handleReg(message) {
    // Ease of typing message variables
    let content = message.content;
    let author = message.author;
    let channel = message.channel;
    let guild = message.huild;
    let member = message.member;

    // Let's find a space, or the end of the line. Whichever comes first.
    let command;
    let tokens;
    let firstSpace = content.indexOf(' ');
    if (firstSpace == -1) {
        command = content;
    } else {
        command = content.substring(0, firstSpace);
        tokens = content.substring(++firstSpace).split(' ');
    }

    // Make sure to log the command!
    console.log(`${author.username} (${author.id}) invoked a command ${command} with tokens [${tokens}].`);

    // Commands
    if (command == "/help") {
        let msg = generateEmbed("I'm here to help!", "00ffff");
        msg.addField("/ping", "Pong!", true);
        channel.send(msg);
    } else if (command == "/ping") {
        channel.send("Pong!");
    } else {
        channel.send(generateError(404));
    }
}

// Generate a random string from strings.json
function randomString() {
    let len = strings.length;
    let index = Math.floor(Math.random() * len);
    let str = strings[index];
    return str;
}

// Generate an error embed
function generateError(code) {
    let embed = new Discord.RichEmbed();
    embed.setAuthor(config.name, pfp, config.website)
        .setDescription("Uh oh, looks like we've encountered an error!")
        .setFooter(randomString(), pfp);
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

// Generate regular embed
function generateEmbed(desc, color) {
    let embed = new Discord.RichEmbed();
    embed.setAuthor(config.name, pfp, config.website)
        .setColor(parseInt(color, 16))
        .setDescription(desc)
        .setFooter(randomString(), pfp);
    return embed;
}

module.exports = handler;
