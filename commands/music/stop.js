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

  const song = queue.songs[0];
  if (!canModifyQueue(message.member)) return;
  queue.songs = [];

  const stopEmbed = new Discord.MessageEmbed()
    .setAuthor("Stop", "https://i.imgur.com/2glTzD1.png")
    .setColor("#7EB9FF")
    .setDescription(`${song.title}`)
    .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);
  queue.connection.dispatcher.end();
  queue.textChannel.send(stopEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stop music and leave",
  usage: "<prefix>stop",
  option: ""
};
