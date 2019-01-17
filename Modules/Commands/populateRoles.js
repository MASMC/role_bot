module.exports = {
    name: "populateRoles",
    description: "Populates the roles for the server",
    perm_lvl: "OWNER",
    execute(message, tokens) {
        let data = message.guild.roles.array();
        let ids = [];
        let names = [];
        for (let i = 1; i < data.length; i++) {
            ids.push(data[i].toString().replace(/[^\d]/g, "")); // RegEx: Not digit, global flag
            let role = message.guild.roles.get(ids[i - 1]);
            names.push(role.name);
            roles[ids[i - 1]] = names[i - 1];
        }
        let toStr = JSON.stringify(roles, null, 4); // Formats JSON file for roles
        fs.writeFile('./Data/roles.json', "{", err => {
            fs.writeFile('./Data/roles.json', toStr, err => {
                console.log;
            });
        });
        console.log("Roles populated.");
        message.channel.send(`Done populating roles. Use \`${config.staffInvoke}viewRoles\` for confirmation of names.`);
    },
};
