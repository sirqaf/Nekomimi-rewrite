const Discord = require("discord.js");
const fs = require("fs");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Onii chan you don't have premission to do that!");
  const reason = args.slice(1).join(" ");
  const user = message.mentions.users.first();
  if (message.mentions.users.size < 1)
    return message.reply("Onii chan you must mention someone to warn them.");
  if (reason.length < 1)
    return message.reply("Onii chan you must have a reason for the warning.");

  const dmsEmbed = new Discord.MessageEmbed()
    .setTitle("Warn")
    .setColor("#FF768F")
    .setDescription(`You have been warned on \`${message.guild.name}\``)
    .addField("Warned by", message.author.tag)
    .addField("Reason", reason);

  user.send(dmsEmbed);

  message.delete();

  message.channel.send(`${user.tag} has been warned`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "warn",
  category: "Moderation",
  description: "Warn specified members",
  usage: "<prefix>warn <username> <reason>",
  option: ""
};
