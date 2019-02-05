// Message handler //

// Look ma, no constructor!
// Generally considered faster and less intensive, since there is no object to make
module.exports = {
    handle(message) {
        // Message things, to allow easier typing
        let content = message.content;
        let author = message.author;
        let channel = message.channel;
        let guild = message.guild;
        let member = message.member;

        // Begin checking the first character
        if (content.substring(0, config.commandInvoke.length) == config.commandInvoke) {
            // Grab the command from client commands, and check permission level
            let user_perm = 0;
            let perm;

            if (author.id == guild.owner.id) user_perm = 3;
            else {
                let data = member.roles.array();
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == config.staffRole || data[i].id == config.adminRole) user_perm = 2;
                }
            }
            if (user_perm < 1) user_perm = 1;

            // Find the first space, set command and tokens based on the spaces in message
            let command;
            let tokens;
            let firstSpace = content.indexOf(' ');
            if (firstSpace == -1) command = message.content.substring(config.commandInvoke.length); // Tokens remains undefined if first space doesn't exist
            else {
                command = message.content.substring(config.commandInvoke.length, firstSpace);
                tokens = message.content.substring(firstSpace + 1).split(" ");                      // Split the string sent at each space (if tokens exist)
            }

            try {
                let cmd = client.commands.get(command);     // Get the command to begin checks
                perm = cmd.perm_lvl;                        // Set perm to the array of the command perm (for shorthand typing)
                if (perm.includes("GENERAL")) perm = 1;     // First check for general perm
                else if (perm.includes("STAFF")) perm = 2;  // Second check for staff perm
                else if (perm.includes("OWNER")) perm = 3;  // Last check for owner perm

                if (user_perm >= perm) {                    // Check if user permission is greater than or equal to command permission
                    cmd.execute(message, tokens);
                } else {
                    message.channel.send(embeds.generateError(403)); // Error code: Unauthorized
                }
            } catch (e) {
                message.channel.send(embeds.generateError(404))     // Error code: Not found
                .then(msg => {
                    message.channel.send(`Type \`${config.commandInvoke}help (general|staff|owner)\` for help!`);
                });
            }
        }
    }
}
