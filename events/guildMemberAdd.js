const chalk = require('chalk');
const fs = require('fs');
const human = require("humanize");
const levels = JSON.parse(fs.readFileSync("./levels.json"));

module.exports = member => {
    console.log(member)
    
};