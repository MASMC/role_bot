class files
{
    constructor()
    {
        // Load config folder
        global.config = updateConfigs();
        global.errors = updateErrors();
        console.log("Configs loaded!");

        // Load data folder
        global.blacklist = updateBlacklist();
        global.roles = updateRoles();
        global.strings = updateStrings();
        console.log("Data loaded!");

        // Load commands
        client.commands = new Discord.Collection();
        updateCommands();
        console.log("Commands loaded!");

        console.log("File system initialized successfully!");
    }
}

function updateStrings() {
    let data = fs.readFileSync("./Data/strings.json");
    let str = JSON.parse(data);
    let strings = str.strings;
    return strings;
}

function updateConfigs() {
    let data = fs.readFileSync("./Config/config.json");
    let configs = JSON.parse(data);
    return configs;
}

function updateBlacklist() {
    let data = fs.readFileSync("./Data/blacklist.json");
    let blacklist = JSON.parse(data);
    return blacklist;
}

function updateRoles() {
    let data = fs.readFileSync("./Data/roles.json");
    let roles = JSON.parse(data);
    return roles;
}

function updateErrors() {
    let data = fs.readFileSync("./Config/errorCodes.json");
    let codes = JSON.parse(data);
    return codes;
}

function updateCommands() {
    // Clear the client commands, so we don't conflict anything
    client.commands = new Discord.Collection();

    // First add the owner commands
    let commandFiles = fs.readdirSync("./Modules/Commands/Owner").filter(file => file.endsWith(".js"));
    addCommands(commandFiles, "Owner");

    // Second add the staff commands
    commandFiles = fs.readdirSync("./Modules/Commands/Staff").filter(file => file.endsWith(".js"));
    addCommands(commandFiles, "Staff");

    // Last add the general commands
    commandFiles = fs.readdirSync("./Modules/Commands/General").filter(file => file.endsWith(".js"));
    addCommands(commandFiles, "General");
}

function addCommands(commandFiles, folder) {
    for (let file of commandFiles) {
        let command = require(`../Modules/Commands/${folder}/${file}`);

        // New item in the collection
        // Key is command name, value is the command function
        client.commands.set(command.name, command);
    }
}

// Watch for file change in blacklist, update if change detected
fs.watchFile('./Data/blacklist.json', (eventType, filename) => {
    blacklist = files.updateBlacklist();
});

// Watch for change in strings, update if change detected
fs.watchFile('./Data/strings.json', (eventType, filename) => {
    strings = files.updateStrings();
});

// Watch for changes in configs, update if change detected
fs.watchFile('./Config/config.json', (eventType, filename) => {
    config = files.updateConfigs();
});

// Watch for changes in error codes, update if change detected
fs.watchFile('./Config/errorCodes.json', (eventType, filename) => {
    errors = files.updateErrors();
});

module.exports = files;
