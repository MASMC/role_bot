module.exports = {
    name: "viewRoles",
    description: "Outputs the role list for the server",
    perm_lvl: "STAFF",
    execute(message, tokens) {
        message.channel.send("```JSON\n" + JSON.stringify(roles, null, 4) + "\n```"); // Formats JSON file for outputting
    },
};
