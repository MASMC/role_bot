module.exports = {
    name: "setInvoke",
    description: "Set the command invoker to whatever you want! It can be \"oo ee oo ah ah ting tang walla walla bing bang\" for all the code cares.",
    perm_lvl: ["OWNER"],
    async execute(message, tokens) {
        if (tokens.length < 1) {
            message.channel.send(embeds.generateError(400)); // Error code: Invalid arguments
        } else {
            let str = "";
            for (let i = 0; i < tokens.length; i++) {
                str = str + tokens[i] + " ";
            }
            str = str.substring(0, str.length - 1);
            config.commandInvoke = str;
            channel.message.send("Command invoker successfully updated!\nNew invoker: " + config.commandInvoke);
        }
    }
};
