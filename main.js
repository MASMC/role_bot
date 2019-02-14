// Log timestamp so we have date and time in the logs
require("log-timestamp")(function() {return '('+new Date().toLocaleString() + ')'});

// Logging tags, custom module for that good logging shit
let Logger = require("./Modules/logging_tags.js");
global.logger = new Logger();

// Import required APIs for bot to function
global.Discord = require("discord.js");
global.fs = require("fs"); // fs is NOT required to be installed through node

// Create any objects we need from the APIs
global.client = new Discord.Client();

// Import files custom module
let Files = require("./Modules/files.js");
global.files = new Files();

// Automatically create embeds
let Embedder = require("./Modules/embeds.js");
global.embeds = new Embedder("");

// Create the handler
global.handler = require("./Modules/handler.js");

// When client is ready, do this!
client.once('ready', () => {
    logger.logStatus("Client connected to Discord, awaiting commands!");
});

// Message handling, thrown to ./Modules/handler.js
client.on('message', (message) => {
    if(blacklist.hasOwnProperty(message.author.id)) // Check all incoming messages against the blacklist
    {
        if(message.content.substring(0,1) == "/" || message.content.substring(0,1) == "!") // If the blacklisted user attempts a command, log it.
        {
            logger.logWarning("Blacklisted user attempted to access the bot!");
        }
    }
    else
    {
        handler.handle(message);
    }
});

/*
 * Credentials set-up
 * We do all file functions here at the end, if they aren't done in the file module.
 *
 * First, a function to load them so we don't offload the work to a seperate module
 */
function loadCreds() {
    let data = fs.readFileSync("./Credentials/credentials.json");
    let creds = JSON.parse(data);
    return creds;
}

// Declare credentials variable, and pass it off!
const credentials = loadCreds();

// GitHub webhook stuff. Ask the bot creator if you want a secret for the main repository.
// He will help you set up your end of the webhook if you need help (and he's feeling well enough)
try {
    let http = require('http');
    let crypto = require('crypto');

    const exec = require('child_process').exec;

    http.createServer(function (req, res) {
        req.on('data', function(chunk) {
            let sig = "sha1=" + crypto.createHmac('sha1', credentials.secret).update(chunk.toString()).digest('hex');

            if (req.headers['x-hub-signature'] == sig) {
                client.channels.find("name", "github").send("Git repository push initiated, pulling data.");
                exec('git pull');
            }
        });

        res.end();
    }).listen(8080);
} catch (e) {
    logger.logUpdate("Webhook not setup. This is not fatal\n\tIt just means you'll have to manually update");
}

// Make sure the client logs in, if auth_token is valid
if (credentials.auth_token.length != 0 && process.argv.length == 2) {
    client.login(credentials.auth_token);
} else if (process.argv.length > 2) {
    if (process.argv[2] == "-t" || process.argv[2] == "--test") {
        logger.logSuccess("Node Test Successful, compile passed.");
        process.exit();
    }
} else {
    logger.logError("Invalid auth token!");
    process.exit();
}
