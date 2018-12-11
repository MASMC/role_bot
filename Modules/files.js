const fs = require("fs");

class files
{
    constructor()
    {
        console.log("File system initialized.");
    }

    updateStrings()
    {
        let data = fs.readFileSync("./Data/strings.json");
        let str = JSON.parse(data);
        let strings = str.strings;
        return strings;
    }

    updateConfigs()
    {
        let data = fs.readFileSync("./Config/config.json");
        let configs = JSON.parse(data);
        return configs;
    }

    updateBlacklist()
    {
        let data = fs.readFileSync("./Data/blacklist.json");
        let blacklist = JSON.parse(data);
        return blacklist;
    }

    updateRoles()
    {
        let data = fs.readFileSync("./Data/roles.json");
        let roles = JSON.parse(data);
        return roles;
    }

    loadCredentials()
    {
        let data = fs.readFileSync("./Credentials/credentials.json");
        let credentials = JSON.parse(data);
        return credentials;
    }
}

module.exports = files;
