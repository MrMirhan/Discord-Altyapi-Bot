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
module.exports = client => {
  console.log(chalk.bgGreen.black(`${client.user.username} ismiyle giriş yapıldı!`));
  client.user.setStatus('online');
  client.user.setActivity(`${PREFIX}yardım`);
}
