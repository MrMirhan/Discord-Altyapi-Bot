const chalk = require('chalk');
const say = require('say')
const config = require("../config.json");
const PREFIX = config.PREFIX;
let time = new Date();
function amPm() {
  if (time.getHours() >= 11) {
    return "PM";
  } else return "AM";
}
module.exports = async client => {

  let members = 0;

  await client.guilds.forEach( async guild => {
    members += guild.members.size;
  })

  console.log(chalk.bgGreen.black(`${client.user.username} ismiyle giriş yapıldı!`));
  console.log("Görülen sunucu sayısı:", chalk.bgGreen.black(`${client.guilds.size}`));
  console.log("Görülen kullanıcı sayısı:", chalk.bgGreen.black(`${members}`));
  client.user.setStatus('dnd');
  client.user.setActivity(`${PREFIX}yardım`);
}
