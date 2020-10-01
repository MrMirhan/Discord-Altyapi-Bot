const chalk = require('chalk');
const human = require("humanize");
module.exports = client => {
  var ToD = new Date();
  function amPm() {
    if (ToD.getHours() >= 11) {
      return "ÖS";
    } else return "ÖÖ";
  }
  console.log(chalk.bgRed.black("Botun bağlantısı kesildi.\nTarih: " + human.date('m-d-y | h:i:s', new Date()) + " " + amPm() + "."));
}
