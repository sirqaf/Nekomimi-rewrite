const Discord = require("discord.js");
const { canModifyQueue } = require("../../modules/musicModifyQueue");

exports.run = async (client, message, args) => {
  const voice = message.member.voice.channel;
  if (!voice) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) {
    return message.channel.send("Onii chan there is no music playing");
  }

  if (!canModifyQueue(message.member)) return;
  if (!args.length || isNaN(args[0])) {
    return message.channel.send(
      `Onii chan you did not type the number of song to be remove, please refer ${client.config.settings.prefix}help remove for details`
    );
  }
  const song = queue.songs.splice(args[0] - 1, 1);

  const removeEmbed = new Discord.MessageEmbed()
    .setAuthor("Remove", "https://i.imgur.com/iqRgnOv.png")
    .setColor("#7EB9FF")
    .setDescription(`${song[0].title}`)
    .setThumbnail(`https://img.youtube.com/vi/${song[0].id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);
  queue.textChannel.send(removeEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "remove",
  category: "Music",
  description: "Remove specific song from queue",
  usage: "<prefix>remove <position>",
  option: ""
};
