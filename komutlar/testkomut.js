const fs = require("fs");
const levels = JSON.parse(fs.readFileSync("./levels.json"));

module.exports = {
    name: "test",
    cooldown: 3,
    permLvl: 0,
    aliases: ["deneme"],
    description: "Test komutudur..",
    async execute (message, client, args) { 
        message.reply('Bu bir test komutu. Bu dosyayı "/komutlar/testkomut.js" içerisinden değiştirebilirsin.')
    }
};