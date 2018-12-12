// Message handler

const Discord = require("discord.js");
const fs = require("fs");
const Files = require("../Modules/files.js");
const files = new Files();

// Config JSON files. We won't modify these at all, they can be constants.
let config = files.updateConfigs();
console.log("Config loaded in handler.js");

// First read of storage JSON files. We do this just so that they're loaded and ready to go.
let blacklist = files.updateBlacklist();
console.log("Blacklisted user list loaded in handler.js");
let roles = files.updateRoles();
console.log("Role list loaded in handler.js");
let strings = files.updateStrings();
console.log("String list loaded in handler.js");

// Global vars
const pfp = "";
const rolePath = "./Data/roles.json";

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

        // Log if command is invoked
        if(content.substring(0,1) == "/" || content.substring(0,1) == "@")
        {
            console.log(`${author.username} has invoked command: ${content}`);
        }

        // Handle owner commands
        if(content.startsWith("@ownerHelp") && message.guild.ownerID == author.id) {
            let msg = generateEmbed("I'm here to help!", "00ffff");
            msg.addField("@throwError","Throws a test error embed. Optional error ID after command.", true);
            msg.addField("@createEmbed", "Creates a test embed. Description required, optional colour in hex format (rrggbb).", true);
            msg.addField("@populateRoles", "Populates the role list (`./Data/roles.json`).", true);
            channel.send(msg);
        }
        else if(content.startsWith("@throwError") && message.guild.ownerID == author.id) {
            if(tokens != undefined) {
                channel.send(generateError(tokens[0]));
            }
            else {
                channel.send(generateError(402));
            }
        }
        else if(content.startsWith("@createEmbed") && message.guild.ownerID == author.id) {
            if(tokens == undefined) {
                channel.send(generateError(400));
            }
            else if(tokens.length == 1) {
                channel.send(generateEmbed(tokens[0], undefined));
            }
            else {
                channel.send(generateEmbed(tokens[0], tokens[1]));
            }
        }
        else if(content.startsWith("@populateRoles") && message.guild.ownerID == author.id) {
            let data = message.guild.roles.array();
            let ids = [];
            let names = [];
            for(let i = 1; i < data.length; i++) {
                ids.push(data[i].toString().replace(/[^\d]/g, ""));
                let role = message.guild.roles.get(ids[i - 1]);
                names.push(role.name);
                roles[ids[i - 1]] = names[i - 1];
            }
            let toStr = JSON.stringify(roles, null, 4);
            fs.writeFile(rolePath, "{", err => {
                fs.writeFile(rolePath, toStr, err => {
                    console.log("Roles populated.");
                });
            });
            channel.send(`Done populating roles. See \`${rolePath}\` for confirmation of names.`);
        }
        else if(content.startsWith("@viewRoles") && message.guild.ownerID == author.id) {
            channel.send("```JSON\n" + JSON.stringify(roles, null, 4) + "\n```");
        }
        else if(content.startsWith("@adminRole") && message.guild.ownerID == author.id) {
            if(message.mentions.roles.first() == undefined && tokens == undefined) {
                channel.send(generateError(400));
            }
            else if(message.mentions.roles.first() == undefined) {
                if(roles.has(tokens[0])) {
                    config.adminRole = tokens[0];
                    console.log("Admin role updated");
                    channel.send("Admin role successfully updated.");
                    fs.writeFileSync("./Config/config.json", JSON.stringify(config, null, 4));
                }
            }
            else {
                let mentionedRole = message.mentions.roles.first();
                config.adminRole = mentionedRole.id;
                console.log("Admin role updated");
                channel.send("Admin role successfully updated.");
                fs.writeFileSync("./Config/config.json", JSON.stringify(config, null, 4));
            }
        }

        // Handle moderation commands
        // if(content.startsWith("!modHelp") && author.) {
        //     let msg = generateEmbed("I'm here to help!", "00ffff");
        //     msg.addField("!say","Allows the bot to \"say\" something.",true);
        //     channel.send(msg);
        // }

        // Handle normal user commands
        if(content.startsWith("/help")) {
            let msg = generateEmbed("I'm here to help!", "00ffff");
            msg.addField("/ping","Pong!",true);
            channel.send(msg);
        }
        else if(content.startsWith("/ping")) {
            channel.send("Pong!");
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
