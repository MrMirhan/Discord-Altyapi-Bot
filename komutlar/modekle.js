const fs = require("fs");
const levels = JSON.parse(fs.readFileSync("./levels.json"));

module.exports = {
    name: "modekle",
    cooldown: 3,
    permLvl: 4,
    aliases: ["addmod"],
    description: "Moderatör ekler.",
    async execute(message, client, args) {
        const kisi = message.mentions.members.first();
        const rol = message.mentions.roles.first();

        if(!rol && kisi){
            let kisii = kisi.id
            if(levels[kisii] && levels[kisii].level >= 1) return message.reply(`<@${kisii}> zaten bir yetkili.`);
            if(levels[kisii]) delete levels[roll];

            var newlevel = 1;


            levels [kisii] = {
                isim: `${kisi.username}`,
                rol: "hayır",
                level: `${newlevel}`
            }

            let data = JSON.stringify(levels, null, 2)

            fs.writeFileSync('./levels.json', data, function(err){
                if(err) throw err
            })
        } else if(!kisi && rol){
            let roll = rol.id
            if(levels[roll] && levels[roll].level >= 1) return message.reply(`<&@${roll}> zaten moderatör rolü.`);
            if(levels[roll]) delete levels[roll];

            var newlevel = 1;

            levels [roll] = {
                isim: `${rol.name}`,
                rol: "evet",
                level: `${newlevel}`
            }

            let data = JSON.stringify(levels, null, 2)

            fs.writeFileSync('./levels.json', data, function(err){
                if(err) throw err
            })
        } else if(!rol && !kisi) {
            return message.reply("rol veya birsini etiketlemelisin.")
        } else if (rol && kisi){
            return message.reply("sadece bir rol veya sadece bir kişi etiketle.")
        }

    }
};