const chalk = require('chalk');
const human = require("humanize");
module.exports = (client, member) => {
    if(levels[member.id]) return;
    levels [member.id] = {
        isim: `${member.user.username}`,
        rol: "hayır",
        level: 0
    }

    let data = JSON.stringify(levels, null, 2)

    fs.writeFileSync('./levels.json', data, function(err){
        if(err) throw err
    })
}
