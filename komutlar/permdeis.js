const fs = require("fs");
const levels = JSON.parse(fs.readFileSync("./levels.json"));
module.exports = {
    name: "yetkideğiş",
    cooldown: 1,
    permLvl: 0,
    aliases: ["pdeğiş"],
    description: "Etiketlenen kişi veya rolün yetki seviyesini değiştirir.",
    execute: async function (message, client, args) {
        const kisi = message.mentions.members.first();
        const rol = message.mentions.roles.first();
        if(message.author.id !== '714616818945359943' && levels[message.author.id].level < args[1]) return message.reply('Kendi yetki seviyenle eşit veya üstünde bir yetki veremezsin.')
        if(!rol && kisi){
            let kisii = kisi.id
            var newlevel = args[1];
            if(levels[kisii] && levels[kisii].level == newlevel) return message.reply('Zaten kişi bu levelde.');
            if(levels[kisii]) delete levels[kisi];

            levels [kisii] = {
                isim: `${kisi.user.username}`,
                rol: "hayır",
                level: `${newlevel}`
            }

            let data = JSON.stringify(levels, null, 2)

            fs.writeFileSync('./levels.json', data, function(err){
                if(err){
                    throw err
                    return message.channel.send('Bir hata meydana geldi.')
                }
            })
            return message.channel.send(`Başarılı! \`${kisi.user.username}\` kişisinin yetki seviyesi artık **${newlevel}**`);
        } else if(!kisi && rol){
            let roll = rol.id
            var newlevel = args[1];
            if(levels[roll] && levels[roll].level == newlevel) return message.reply('Zaten rol bu levelde.');
            if(levels[roll]) delete levels[roll];

            levels [roll] = {
                isim: `${rol.name}`,
                rol: "evet",
                level: `${newlevel}`
            }

            let data = JSON.stringify(levels, null, 2)

            fs.writeFileSync('./levels.json', data, function(err){
                if(err){
                    throw err
                    return message.channel.send('Bir hata meydana geldi.')
                }
            })
            message.channel.send(`Başarılı! \`${rol.name}\` rolünün yetki seviyesi artık **${newlevel}**`);
        } else if(!rol && !kisi) {
            return message.reply("rol veya birsini etiketlemelisin.")
        } else if (rol && kisi){
            return message.reply("sadece bir rol veya sadece bir kişi etiketle.")
        }
    }
};