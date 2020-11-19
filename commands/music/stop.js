const Discord = require("discord.js");
const { canModifyQueue } = require("../../modules/musicModifyQueue");

exports.run = async (client, message, args, level) => {
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
    .setAuthor(
      "Stop",
      "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fstop.png?v=1598773024116"
    )
    .setColor("#7EB9FF")
    .setDescription(`${song.title}`)
    .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);
  queue.connection.dispatcher.end();
  queue.textChannel.send(stopEmbed).catch(console.error);
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
  description: "Stop music and leave by minimum vote of 2 user",
  usage: "<prefix>stop",
  option: ""
};
