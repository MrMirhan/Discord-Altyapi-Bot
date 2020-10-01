const Discord = require("discord.js");

module.exports = {
  name: "yardım",
  cooldown: 3,
  permLvl: 0,
  aliases: ["help"],
  description: "Sistemde bulunan komutları gösterir.",
  execute(message, client) {
    let commands = message.client.commands.array();
    let helpEmbed = new Discord.RichEmbed()
      .setTitle( client.user.username + " Komutları")
      .setDescription("İşte tüm komutlarım:")
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}\n` + `Yetki seviyesi: ${cmd.permLvl || "Yok"}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
