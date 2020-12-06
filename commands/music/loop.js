const Discord = require("discord.js");
const { canModifyQueue } = require("../../modules/musicModifyQueue");

exports.run = async (client, message) => {
  const voice = message.member.voice.channel;
  if (!voice) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) {
    return message.channel.send("Onii chan there is no music playing");
  }

  if (!canModifyQueue(message.member)) return;
  queue.loop = !queue.loop;

  const loopEmbed = new Discord.MessageEmbed()
    .setAuthor("Loop", "https://i.imgur.com/hT5tIut.png")
    .setDescription(`set to [ ${queue.loop ? "**on**" : "**off**"} ]`)
    .setColor("#7EB9FF")
    .setFooter(`user: ${message.member.user.username}`);
  return queue.textChannel.send(loopEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "loop",
  category: "Music",
  description: "Set the loop state",
  usage: "<prefix>loop",
  option: ""
};
