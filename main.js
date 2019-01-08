// Import required APIs for bot to function
global.Discord = require("discord.js");
require("log-timestamp")(function() {return '('+new Date().toLocaleString() + ')'});
global.fs = require("fs"); // fs is NOT required to be installed through node

// Import files custom module
global.Files = require("./Modules/files.js");
global.files = new Files();

// Create any objects we need from the APIs
global.client = new Discord.Client();

// Config JSON files. We won't modify these at all, they can be constants.
const credentials = files.loadCredentials();
global.config = files.updateConfigs();
global.errors = files.updateErrors();
console.log("Credentials and configs loaded in main.js");

// First read of storage JSON files. We do this just so that they're loaded and ready to go.
global.blacklist = files.updateBlacklist();
global.roles = files.updateRoles();
global.strings = files.updateStrings();

console.log("Data loaded in main.js, beginning setup");
console.log("File system initialized.");

// Create the handler
global.Handler = require("./Modules/new_handler.js");
global.handler = new Handler();

// When client is ready, do this!
client.once('ready', () => {
    console.log("Client connected to Discord. Awaiting commands!");
});

// Message handling, thrown to ./Modules/handler.js
client.on('message', (message) => {
    if(blacklist.hasOwnProperty(message.author.id))
    {
        if(message.content.substring(0,1) == "/")
        {
            console.log("Blacklisted user attempted to use the bot!");
        }
    }
    else
    {
        handler.handle(message);
    }
});

// Make sure the client logs in
client.login(credentials.auth_token);

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
