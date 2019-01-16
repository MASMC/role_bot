module.exports = {
    name: "viewConfigs",
    description: "Allows owner to view configuration file",
    perm_lvl: "OWNER",
    execute(message, tokens) {
        message.channel.send("```JSON\n" + JSON.stringify(config, null, 4) + "\n```"); // Formats JSON file for outputting
    },
};
