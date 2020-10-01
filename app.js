require("events").EventEmitter.prototype._maxListeners = 100;
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");
const fs = require("fs");
const chalk = require('chalk');
const human = require("humanize");
const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("warn", (info) => console.log(info));

  require("./util/eventLoader")(client);
  process.on("unhandledRejection", err => {
    console.log("Unhandled Rejection:\n" + err.stack);
  });

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "komutlar", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  const levels = JSON.parse(fs.readFileSync("./levels.json"));
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
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
    if(parseInt(command.permLvl) > 0) return message.reply(`Bu komutu kullanabilmen için yetki seviyenin **${parseInt(command.permLvl)}** olması gerekiyor. Senin yetki seviyen: **0**`)
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
      console.log(bulunanlar.length)
      if(bulunanlar.length > 0){
        var max = Math.max(bulunanlar);
        if(max < parseInt(command.permLvl)) return message.reply(`!Bu komutu kullanabilmen için yetki seviyenin **${parseInt(command.permLvl)}** olması gerekiyor. Senin yetki seviyen: **${parseInt(levels[message.author.id].level)}**`)
      } else {
        return message.reply(`?Bu komutu kullanabilmen için yetki seviyenin **${parseInt(command.permLvl)}** olması gerekiyor. Senin yetki seviyen: **${parseInt(levels[message.author.id].level)}**`)
      }
    }
  }
});

client.on('guildMemberAdd', (member) =>{
  if(levels[member.id]) return;
  levels [member.id] = {
    isim: `${member.user.username}`,
    rol: "hayır",
    level: 0
  }

  let data = JSON.stringify(levels, null, 2)

  fs.writeFileSync('./levels.json', data, function(err){
    if(err) throw err
  })
})