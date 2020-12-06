const Discord = require("discord.js");
const { canModifyQueue } = require("../../modules/musicModifyQueue");

exports.run = (client, message) => {
  const voice = message.member.voice.channel;
  if (!voice) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) {
    return message.channel.send("Onii chan there is no music playing");
  }

  if (!canModifyQueue(message.member)) return;

  let songs = queue.songs;
  for (let i = songs.length - 1; i > 1; i--) {
    let j = 1 + Math.floor(Math.random() * i);
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.songs = songs;
  message.client.queue.set(message.guild.id, queue);
  const shuffleEmbed = new Discord.MessageEmbed()
    .setAuthor("Shuffle", "https://i.imgur.com/yGmONoF.png")
    .setDescription("queue has been shuffled")
    .setColor("#7EB9FF")
    .setFooter(`user: ${message.member.user.username}`);
  queue.textChannel.send(shuffleEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "shuffle",
  category: "Music",
  description: "Shuffle song in queue",
  usage: "<prefix>shuffle",
  option: ""
};
