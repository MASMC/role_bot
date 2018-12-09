// Import required APIs for bot to function
const Discord = require("discord.js");
const fs = require("fs"); // fs is NOT required to be installed through node

// Create any objects we need from the APIs
var client = new Discord.Client();

// Config JSON files. We won't modify these at all, they can be constants.
let data; // Global variable data, to read files into. USed to parse to JSON for the real files
data = fs.readFileSync("./Credentials/credentials.json");
const credentials = JSON.parse(data);
data = fs.readFileSync("./Config/config.json");
const config = JSON.parse(data);
console.log("Credentials and configs loaded.");

// First read of storage JSON files. We do this just so that they're loaded and ready to go.
data = fs.readFileSync("./Data/blacklist.json");
let blacklist = JSON.parse(data);
console.log("Blacklisted user list loaded");
data = fs.readFileSync("./Data/roles.json");
let roles = JSON.parse(data);
console.log("Role list loaded");
data = fs.readFileSync("./Data/strings.json");
let strings = JSON.parse(data);
console.log("String list loaded");

console.log("Data loaded, beginning setup");

// Global templates, such as error embed
const pfp = "";
const errorTemplate = new Discord.RichEmbed();
errorTemplate.setAuthor(config.name, pfp, config.website)
.setColor([255, 0, 0])
.setDescription("Uh oh! We've encountered an error!")
.setFooter(randomString(), pfp);

const embedTemplate = new Discord.RichEmbed();
embedTemplate.setAuthor(config.name, pfp, config.website)
.setFooter(randomString(), pfp);

// When client is ready, do this!
client.once('ready', () => {
    console.log("Client connected to Discord. Awaiting commands!");
    console.log(`Client name: ${config.name}\nClient config location: ../Config/config.json`);
});

// Message handling. We'll throw this at a modular function handler later
// For now, let's just ping pong it!
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
        if(message.content.startsWith("/ping"))
        {
            message.channel.send("Pong!");
        }
    }
});

// Make sure the client logs in
client.login(credentials.auth_token);

// Functions required for running
function randomString() {
    return "Test String";
}

// Watch for file change in blacklist, update if change detected
fs.watchFile('./Data/blacklist.json', (eventType, filename) => {
    fs.readFile("./Data/blacklist.json", (err, data) => {
        blacklist = JSON.parse(data);
        console.log("Blacklist updated!");
    });
});

// Watch for change in roles, update if change detected
fs.watch('./Data/roles.json', (eventType, filename) => {
    fs.readFile("./Data/roles.json", (err, data) => {
        roles = JSON.parse(data);
        console.log("Roles updated!");
    });
});

// Watch for change in strings, update if change detected
fs.watch('./Data/strings.json', (eventType, filename) => {
    fs.readFile("./Data/strings.json", (err, data) => {
        strings = JSON.parse(data);
        console.log("Strings updated!");
    });
});
