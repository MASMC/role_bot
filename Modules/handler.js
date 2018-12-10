// Message handler

const Discord = require("discord.js");
const fs = require("fs");

// Config JSON files. We won't modify these at all, they can be constants.
let data; // Global variable data, to read files into. USed to parse to JSON for the real files
data = fs.readFileSync("./Config/config.json");
let config = JSON.parse(data);
console.log("Config loaded in handler.js");

// First read of storage JSON files. We do this just so that they're loaded and ready to go.
data = fs.readFileSync("./Data/blacklist.json");
let blacklist = JSON.parse(data);
console.log("Blacklisted user list loaded in handler.js");
data = fs.readFileSync("./Data/roles.json");
let roles = JSON.parse(data);
console.log("Role list loaded in handler.js");
data = fs.readFileSync("./Data/strings.json");
let stringsObj = JSON.parse(data);
let strings = stringsObj.strings;
console.log("String list loaded in handler.js");

// Global vars
const pfp = "";

const embedTemplate = new Discord.RichEmbed();
embedTemplate.setAuthor(config.name, pfp, config.website)
.setFooter(randomString(), pfp);

class handler
{
    constructor() {
        console.log("Handler initialized and awaiting messages");
    }

    handle(message) {
        // Message things, for ease of typing
        let content = message.content;
        let author = message.author;
        let channel = message.channel;

        // Check for the first space
        let command;
        let tokens;
        let firstSpace = content.indexOf(' ');
        if(firstSpace == -1)
        {
            command = content;
        }
        else
        {
            command = content.substring(0, firstSpace);
            tokens = content.substring(firstSpace + 1).split(" ");
        }

        // DEBUG FUNCTION
        // console.log(command + "[" + tokens + "]");

        // Begin handling commands
        if(content.substring(0,1) == "/")
        {
            console.log(`${message.author.username} has invoked command: ${message.content}`);
        }

        if(content.startsWith("/ping"))
        {
            channel.send("Pong!");
        }
        else if(content.startsWith("/string"))
        {
            channel.send("Your string is: " + randomString());
        }
        else if(content.startsWith("/testError"))
        {
            if(content.indexOf(' ') != -1)
            {
                let num = content.substring(content.indexOf(' ') + 1);
                channel.send(generateError(num));
            }
            else
            {
                channel.send(generateError(402));
            }
        }
        else if(content.startsWith("/testEmbed"))
        {
            if(content.indexOf(' ') != -1)
            {
                let tokens = content.split(' ');
                // console.log(tokens);
                if(tokens.length > 2)
                {
                    // console.log(tokens[1] + " " + tokens[2]);
                    channel.send(generateEmbed(tokens[1], tokens[2]));
                }
                else if(tokens.length == 2)
                {
                    channel.send(generateEmbed(tokens[1]));
                }
                else
                {
                    channel.send(generateEmbed("Default Description"));
                }
            }
        }
    }
}

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

module.exports = handler;
