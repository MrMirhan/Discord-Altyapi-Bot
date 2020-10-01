const chalk = require('chalk');
const human = require("humanize");
module.exports = (client, error) => {
  console.log(chalk.bgRed(error));
}
