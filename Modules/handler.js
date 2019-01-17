// Message handler //

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
            if (content.substring(0, config.ownerInvoke.length) == config.ownerInvoke) {
                if (author.id == guild.owner.id) {
                    handleOwner(message);
                } else {
                    channel.send(embeds.generateError(403));
                }
            } else if (content.substring(0, 1) == "!") {
                let data = member.roles.array();
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == config.staffRole || data[i].id == config.adminRole) {
                        handleStaff(message);
                        return;
                    }
                }
                channel.send(embeds.generateError(403));
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

    // Let's find a space, or the end of line. Whichever comes first.
    let command;
    let tokens;
    let firstSpace = content.indexOf(' ');
    if (firstSpace == -1) {
        command = content.substring(config.ownerInvoke.length);
    } else {
        command = content.substring(config.ownerInvoke.length, firstSpace);
        tokens = content.substring(++firstSpace).split(' ');
    }

    // Make sure to log the command!
    console.log(`${author.username} (${author.id}) invoked owner-level command ${command} with tokens [${tokens}]`);

    // Commands execution
    if (!client.commands.has(command)) {
        message.channel.send(embeds.generateError(404));
        return;
    }

    try {
        client.commands.get(command).execute(message, tokens);
    } catch (error) {
        console.log(error);
        message.channel.send(embeds.generateError(0));
    }
    // else if (command == "!/throwError") {
    //     if (tokens != undefined) {
    //         channel.send(embeds.generateError(tokens[0]));
    //     } else {
    //         channel.send(embeds.generateError(402));
    //     }
    // } else if (command == "!/createEmbed") {
    //     if (tokens == undefined) {
    //         channel.send(embeds.generateError(400));
    //     } else if (tokens.length = 1) {
    //         channel.send(embeds.generateEmbed(tokens[0]));
    //     } else {
    //         let msg = "";
    //         for (let i = 1; i < tokens.length - 1; i++) {
    //             msg = msg + tokens[i] + " ";
    //         }
    //         channel.send(embeds.generateEmbed(msg, tokens[tokens.length - 1]));
    //     }
    // } else if (command == "!/populateRoles") {
    //     client.commands.get("populateRoles").execute(message, tokens);
    // } else if (command == "!/viewRoles") {
    //     client.commands.get("viewRoles").execute(message, tokens);
    // } else if (command == "!/viewConfigs") {
    //     client.commands.get("viewConfigs").execute(message, tokens);
    // } else if (command == "!/adminRole") {
    //     client.commands.get("adminRole").execute(message, tokens);
    // } else if (command == "!/staffRole") {
    //     if (message.mentions.roles.first() == undefined && tokens == undefined) {
    //         console.log("staffrole");
    //         channel.send(embeds.generateError(400));
    //     } else if (message.mentions.roles.first() == undefined) {
    //         if (roles.hasOwnProperty(tokens[0])) {
    //             config.staffRole = tokens[0];
    //             console.log("Staff role updated!");
    //             channel.send("Staff role successfully updated.");
    //             fs.writeFileSync(configPath + 'config.json', JSON.stringify(config, null, 4));
    //         } else {
    //             channel.send(embeds.generateError(404));
    //         }
    //     } else {
    //         let mentionedRole = message.mentions.roles.first();
    //         config.staffRole = mentionedRole.id;
    //         console.log("Staff role updated!");
    //         channel.send("Staff role successfully updated.");
    //         fs.writeFileSync(configPath + 'config.json', JSON.stringify(config, null, 4));
    //     }
    // } else if (command == "!/shutdown") {
    //     client.commands.get("shutdown").execute(message, tokens);
    // } else {
    //     channel.send(embeds.generateError(404));
    // }
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
        let msg = embeds.generateEmbed("I'm here to help!", "00ffff");
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
        } else {
            channel.send(embeds.generateError(400));
        }
    } else if (command == "!viewRoles") {
        let staffRoles = member.roles.array();
        let strStaffRoles = "";
        for (let i = 0; i < staffRoles.length; i++) {
            if (staffRoles[i].name == "@everyone") {
                strStaffRoles = strStaffRoles + "everyone ";
            } else {
                strStaffRoles = strStaffRoles + staffRoles[i].name + " ";
            }
        }
        channel.send(strStaffRoles);
    } else {
        channel.send(embeds.generateError(404));
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
        let msg = embeds.generateEmbed("I'm here to help!", "00ffff");
        msg.addField("/ping", "Pong!", true);
        channel.send(msg);
    } else if (command == "/ping") {
        client.commands.get("ping").execute(message, tokens);
    } else {
        channel.send(embeds.generateError(404));
    }
}

module.exports = handler;
