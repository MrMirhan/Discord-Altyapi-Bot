const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const ayarlar = require("../config.json");
const fs = require('fs');
let PREFIX = ayarlar.PREFIX;
const levels = JSON.parse(fs.readFileSync("./levels.json"));
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = message => {
    const client = message.client;
    if (message.author == client) return;
    if (!message.guild) return;

    const prefixRegex = new RegExp(`^(<@!?${client.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `Lütfen \`${command.name}\` komutunu yazmadan önce ${timeLeft.toFixed(1)} saniye bekleyin. `
            );
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    levels == JSON.parse(fs.readFileSync("./levels.json"));

    let kisi = levels[message.author.id];

    if(!kisi){
        levels [message.author.id] = {
            isim: `${message.author.username}`,
            rol: "hayır",
            level: 0
        }

        let data = JSON.stringify(levels, null, 2)

        fs.writeFileSync('./levels.json', data, function(err){
            if(err) throw err
        })
        if(parseInt(command.permLvl) == 0){
            return command.execute(message, client, args);
        } else {
            if(message.member.permissions.has("ADMINISTRATOR")){
                return command.execute(message, message.client, args);
            } else {
                if(parseInt(command.permLvl) > 0) return message.reply(`Bu komutu kullanabilmen için yetki seviyenin **${parseInt(command.permLvl)}** olması gerekiyor. Senin yetki seviyen: **0**`)
                return command.execute(message, client, args);
            }
        }
        
    } else {
        if(parseInt(command.permLvl) == 0){
            return command.execute(message, client, args);
        } else {
            if(parseInt(kisi.level) < parseInt(command.permLvl)){
                let roller = message.member._roles
                let bulunanlar = [];
                    Object.keys(levels).forEach(function(k){
                        if(levels[k].rol == 'evet'){
                            if(roller.some(x=> x == k)) {
                                bulunanlar.push(levels[k].level)
                            }
                        }
                    });
                    if(bulunanlar.length > 0){
                        var max = Math.max(bulunanlar);
                        if(message.member.permissions.has("ADMINISTRATOR")){
                            return command.execute(message, message.client, args);
                        } else {
                            if(parseInt(max) < parseInt(command.permLvl)) return message.reply(`Bu komutu kullanabilmen için yetki seviyenin **${parseInt(command.permLvl)}** olması gerekiyor. Senin yetki seviyen: **${parseInt(levels[message.author.id].level)}**`)
                            return command.execute(message, message.client, args);
                        }
                    } else {
                        if(message.member.permissions.has("ADMINISTRATOR")){
                            return command.execute(message, message.client, args);
                        } else {
                            return message.reply(`Bu komutu kullanabilmen için yetki seviyenin **${parseInt(command.permLvl)}** olması gerekiyor. Senin yetki seviyen: **${parseInt(levels[message.author.id].level)}**`)
                        }
                    }
                }
        }
    }
};
