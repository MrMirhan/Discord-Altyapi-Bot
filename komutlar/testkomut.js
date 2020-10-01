const fs = require("fs");
const levels = JSON.parse(fs.readFileSync("./levels.json"));
module.exports = {
    name: "test",
    cooldown: 3,
    permLvl: 0,
    aliases: ["deneme"],
    description: "Test komutudur..",
    execute: async function (message, client, args) { // yeni bir komut eklerken buradaki gönderilişe dikkat edin
        //kodlar                                       // client argümanlardan önce gönderiliyor message, client, args
                                                        // eğer message, args olarak yaparsanız komutunuz çalışmaz ve
                                                        // args olarak yazdığınız tanımlayıcıya client atanmış olur.

        return message.reply('Bu bir test komutu. Bu dosyayı "/komutlar/testkomut.js" içerisinden değiştirebilirsin.')
    }
};