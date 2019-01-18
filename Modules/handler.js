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
        if (!client.commands.get(command).perm_lvl.includes("OWNER")) {
            message.channel.send(embeds.generateError(404));
        } else {
            client.commands.get(command).execute(message, tokens);
        }
    } catch (error) {
        console.log(error);
        message.channel.send(embeds.generateError(0));
    }
}

// Staff/Admin only commands
function handleStaff(message) {
    // Message properties, allowing easier typing
    let content = message.content;
    let channel = message.channel;
    let author = message.author;

    // Find the first space, or the end of line
    let command;
    let tokens;
    let firstSpace = content.indexOf(' ');
    if (firstSpace == -1) {
        command = content.substring(config.staffInvoke.length);
    } else {
        command = content.substring(config.staffInvoke.length, firstSpace);
        tokens = content.substring(++firstSpace).split(' ');
    }

    // Make sure to log the command!
    console.log(`${author.username} (${author.id}) invoked command ${command} with tokens [${tokens}]`);

    // Commands execution
    if (!client.commands.has(command)) {
        message.channel.send(embeds.generateError(404));
        return;
    }

    try {
        if (!client.commands.get(command).perm_lvl.includes("STAFF")) {
            message.channel.send(embeds.generateError(404));
        } else {
            client.commands.get(command).execute(message, tokens);
        }
    } catch (error) {
        console.log(error);
        message.channel.send(embeds.generateError(0));
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
        command = content.substring(config.generalInvoke.length);;
    } else {
        command = content.substring(config.generalInvoke.length, firstSpace);
        tokens = content.substring(++firstSpace).split(' ');
    }

    // Make sure to log the command!
    console.log(`${author.username} (${author.id}) invoked a command ${command} with tokens [${tokens}].`);

    // Commands execution
    if (!client.commands.has(command)) {
        message.channel.send(embeds.generateError(404));
        return;
    }

    try {
        if (!client.commands.get(command).perm_lvl.includes("GENERAL")) {
            message.channel.send(embeds.generateError(404));
        } else {
            client.commands.get(command).execute(message, tokens);
        }
    } catch (error) {
        console.log(error);
        message.channel.send(embeds.generateError(0));
    }
}

module.exports = handler;
