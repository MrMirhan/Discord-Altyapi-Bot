const chalk = require('chalk');
const fs = require('fs');
const human = require("humanize");
const levels = JSON.parse(fs.readFileSync("../levels.json"));

module.exports = member => {
    console.log(chalk.bgRed(member.username, 'katıldı.'));
    if(levels[member.id]) return;
    levels [member.id] = {
        isim: `${member.user.username}`,
        rol: "hayır",
        level: "0"
    }

    let data = JSON.stringify(levels, null, 2)

    return fs.writeFileSync("../levels.json", data, function(err){
        if(err) throw err
    })
};