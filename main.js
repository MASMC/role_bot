// Import required APIs for bot to function
const Discord = require("discord.js");
const fs = require("fs"); // fs is NOT required to be installed through node

// Create any objects we need from the APIs
var client = new Discord.Client();

// Config JSON files. We won't modify these at all, they can be constants.
var data; // Global variable data, to read files into. USed to parse to JSON for the real files
data = fs.readFileSync("../Credentials/credentials.json");
const credentials = JSON.parse(data);
data = fs.readFileSync("../Config/config.json");
const config = JSON.parse(data);
console.log("Credentials and configs loaded.");

// First read of storage JSON files. We do this just so that they're loaded and ready to go.
data = fs.readFileSync("../Data/blacklist.json");
var blacklist = JSON.parse(data);
console.log("Blacklisted user list loaded");
data = fs.readFileSync("../Data/roles.json");
var roles = JSON.parse(data);
console.log("Role list loaded");

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
  if(message.contents.startsWith("/ping"))
  {
    message.channel.send("Pong!");
  }
});

// Make sure the client logs in
client.login(credentials.auth_token);

// Functions required for running
function randomString() {
  return "Test String";
}
