class files
{
    constructor()
    {
        // Load config folder
        global.config = this.updateConfigs();
        global.errors = this.updateErrors();
        logger.logStatus("Configs loaded!");

        // Load data folder
        global.blacklist = this.updateBlacklist();
        global.roles = this.updateRoles();
        global.strings = this.updateStrings();
        logger.logStatus("Data loaded!");

        // Load commands
        client.commands = new Discord.Collection();
        updateCommands();
        logger.logStatus("Commands loaded!");

        logger.logSuccess("File system loaded successfully!");
    }

    updateStrings() {
        let data = fs.readFileSync("./Data/strings.json");
        let str = JSON.parse(data);
        let strings = str.strings;
        return strings;
    }

    updateConfigs() {
        let data = fs.readFileSync("./Config/config.json");
        let configs = JSON.parse(data);
        return configs;
    }

    updateBlacklist() {
        let data = fs.readFileSync("./Data/blacklist.json");
        let blacklist = JSON.parse(data);
        return blacklist;
    }

    updateRoles() {
        let data = fs.readFileSync("./Data/roles.json");
        let roles = JSON.parse(data);
        return roles;
    }

    updateErrors() {
        let data = fs.readFileSync("./Config/errorCodes.json");
        let codes = JSON.parse(data);
        return codes;
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
    let commandFiles = fs.readdirSync("./Modules/Commands/").filter(file => file.endsWith(".js"));
    for (let file of commandFiles) {
        let command = require(`../Modules/Commands/${file}`);

        // New item in the collection
        // Key is command name, value is the command function
        client.commands.set(command.name, command);
    }
}

// Watch for file change in blacklist, update if change detected
fs.watchFile('./Data/blacklist.json', (eventType, filename) => {
    blacklist = updateBlacklist();
});

// Watch for change in strings, update if change detected
fs.watchFile('./Data/strings.json', (eventType, filename) => {
    strings = updateStrings();
});

// Watch for changes in configs, update if change detected
fs.watchFile('./Config/config.json', (eventType, filename) => {
    config = updateConfigs();
});

// Watch for changes in error codes, update if change detected
fs.watchFile('./Config/errorCodes.json', (eventType, filename) => {
    errors = updateErrors();
});

module.exports = files;
