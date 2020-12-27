require("events").EventEmitter.prototype._maxListeners = 100;
const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: "everyone" });
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");
const fs = require("fs");
const chalk = require('chalk');
const human = require("humanize");

client.login(TOKEN);
client.commands = new Discord.Collection();
client.prefix = PREFIX;
client.queue = new Map();
client.cooldowns = new Discord.Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("warn", (info) => console.log(info));

  require("./util/eventLoader")(client);
  process.on("unhandledRejection", err => {
    console.log("Unhandled Rejection:\n" + err.stack);
  });

  function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}   

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "komutlar", `${file}`));
  console.log(command.name, "etkinleştirildi.")
  client.commands.set(command.name, command);
}

client.on('guildMemberAdd', (member) =>{
  let levels = JSON.parse(fs.readFileSync("./levels.json"));
  if(levels[member.id]) return;
  levels [member.id] = {
    isim: `${member.user.username}`,
    rol: "hayır",
    level: "0"
  }

  let data = JSON.stringify(levels, null, 2)

  fs.writeFileSync('./levels.json', data, function(err){
    if(err) throw err
  })
})