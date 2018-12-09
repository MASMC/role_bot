// Import required APIs for bot to function
const Discord = require("discord.js");
require("log-timestamp")(function() {return '('+new Date().toLocaleString() + ')'});
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
let stringsObj = JSON.parse(data);
let strings = stringsObj.strings;
console.log("String list loaded");

console.log("Data loaded, beginning setup");

// // DEBUG FUNCTION
// for(let i = 0; i < strings.length; i++)
// {
//     console.log(strings[i]);
// }

// Global vars
const pfp = "";

const embedTemplate = new Discord.RichEmbed();
embedTemplate.setAuthor(config.name, pfp, config.website)
.setFooter(randomString(), pfp);

// When client is ready, do this!
client.once('ready', () => {
    console.log(`Client name: ${config.name}\nClient config location: ../Config/config.json`);
    console.log("Client connected to Discord. Awaiting commands!");
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
        if(message.content.substring(0,1) == "/")
        {
            console.log(`${message.author.username} has invoked command: ${message.content}`);
        }

        if(message.content.startsWith("/ping"))
        {
            message.channel.send("Pong!");
        }
        else if(message.content.startsWith("/string"))
        {
            message.channel.send("Your string is: " + randomString());
        }
        else if(message.content.startsWith("/testError"))
        {
            if(message.content.indexOf(' ') != -1)
            {
                let num = message.content.substring(message.content.indexOf(' ') + 1);
                message.channel.send(generateError(num));
            }
            else
            {
                message.channel.send(generateError(402));
            }
        }
        else if(message.content.startsWith("/testEmbed"))
        {
            if(message.content.indexOf(' ') != -1)
            {
                let tokens = message.content.split(' ');
                // console.log(tokens);
                if(tokens.length > 2)
                {
                    // console.log(tokens[1] + " " + tokens[2]);
                    message.channel.send(generateEmbed(tokens[1], tokens[2]));
                }
                else if(tokens.length == 2)
                {
                    message.channel.send(generateEmbed(tokens[1]));
                }
                else
                {
                    message.channel.send(generateEmbed("Default Description"));
                }
            }
        }
    }
});

// Make sure the client logs in
client.login(credentials.auth_token);

// Functions required for running
function randomString() {
    let len = strings.length;
    let index = Math.floor(Math.random() * len);
    let str = strings[index];
    // console.log(str);
    return str;
}

// Generate an error embed
function generateError(code) {
    let embed = new Discord.RichEmbed();
    embed.setAuthor(config.name, pfp, config.website)
    .setFooter(randomString(), pfp);
    if(code == 402)
    {
        embed.setColor([0,255,0])
        .setDescription("All is well!")
        .addField("Error Code:", code, true)
        .addField("Error Description:", "All is well!");
    }
    else
    {
        embed.setColor([255,0,0])
        .setDescription("Uh oh! We've encountered an error!")
        .addField("Error Code:", code, true)
        .addField("Error Description:", "UNKNOWN");
    }
    return embed;
}

function generateEmbed(desc, color)
{
    // console.log("2 arg");
    let embed = new Discord.RichEmbed();
    embed.setAuthor(config.name, pfp, config.website)
    .setColor(parseInt(color, 16))
    .setDescription(desc)
    .setFooter(randomString(), pfp);
    return embed;
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
        stringsObj = JSON.parse(data);
        strings = stringsObj.strings;
        console.log("Strings updated!");
    });
});
