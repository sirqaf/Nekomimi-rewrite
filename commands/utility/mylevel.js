const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  const levelEmbed = new Discord.MessageEmbed()
    .setColor("#7EB9FF")
    .setDescription(`Your permission level is: ${level} - ${friendly}`);
  message.channel.send(levelEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Utility",
  description: "View your permission level",
  usage: "<prefix>mylevel",
  option: ""
};
