module.exports = {
    name: "testHelp",
    description: "Testing help function (BROKEN, DO NOT USE)",
    perm_lvl: ["OWNER", "STAFF", "GENERAL"],
    async execute(message, tokens) {
        // Check for tokens
        if (tokens == undefined) {
            message.channel.send(embeds.generateError(400));
            return;
        }
        helpMe(message, tokens);
    },
};

function helpMe(message, tokens) {
    // Check if the first token is a valid permission level
    if (tokens[0].toLowerCase() == "owner" || tokens[0].toLowerCase() == "staff" || tokens[0].toLowerCase() == "general") {
        // Create the base embed
        let msg = embeds.generateEmbed("I'm here to help!", "00ffff");
        let commandList = [];
        let commandFiles = fs.readdirSync("./Modules/Commands/").filter(file => file.endsWith(".js"));
        for (let file of commandFiles) {
            let command = require(`./${file}`);

            // If perm_lvl == the first token, add to array for output
            if (command.perm_lvl.includes(tokens[0].toUpperCase())) {
                commandList.push([command.name, command.description]);
            }
        }

        client.on("raw", event => {

        });
    }
}
