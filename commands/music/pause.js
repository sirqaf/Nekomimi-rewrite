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
  
  const pauseEmbed = new Discord.MessageEmbed()
    .setAuthor(
      "Pause",
      "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fpause.png?v=1598773026714"
    )
    .setColor("#7EB9FF")
    .setDescription(`${song.title}`)
    .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);

  if (queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause(true);
    return queue.textChannel.send(pauseEmbed).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "pause",
  category: "Music",
  description: "Pause playing song",
  usage: "<prefix>pause",
  option: ""
};
