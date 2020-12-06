const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    let role = message.guild.roles.cache.find(role => role.name === "muted");
    const toMute = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    const unmuteEmbed = new Discord.MessageEmbed()
      .setColor("#7EB9FF")
      .setDescription(
        `${message.member.user.tag} has **unmuted** ${toMute.user.tag}`
      );

    toMute.roles.remove(role.id);
    message.channel.send(unmuteEmbed);
    if (!role)
      return message.channel.send(`Onii chan i cannot find the role "muted"`);
    if (!toMute)
      return message.channel.send(`Onii chan i cannot find the mentioned user`);
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with unmute command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "unmute",
  category: "Moderation",
  description: "Unmutes a member.",
  usage: "unmute @<user>",
  option: ""
};
