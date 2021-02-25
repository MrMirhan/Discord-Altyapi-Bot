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


const commandFiles = readdirSync(join(__dirname, "komutlar")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "komutlar", `${file}`));
  console.log(command.name, "etkinleştirildi.")
  client.commands.set(command.name, command);
}