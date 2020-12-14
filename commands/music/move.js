const Discord = require("discord.js");
const move = require("array-move");
const { canModifyQueue } = require("../../modules/musicModifyQueue");

exports.run = (client, message, args) => {
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.channel.send("Onii chan there is no queue");
  const voice = message.member.voice.channel;
  if (!voice) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  if (!canModifyQueue(message.member)) return;

  if (!args.length || isNaN(args[0]) || args[0] <= 1) {
    return message.channel.send(
      `Onii chan please state the queue number, see ${client.config.settings.prefix}help move for more details`
    );
  }

  let song = queue.songs[args[0] - 1];

  queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
  const moveEmbed = new Discord.MessageEmbed()
    .setAuthor("Move", "https://i.imgur.com/DdlfWEn.png")
    .setColor("#7EB9FF")
    .setDescription(
      `**${song.title}** \n [ **${args[1] == 1 ? 1 : args[1] - 1}** in queue ]`
    )
    .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);
  queue.textChannel.send(moveEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "move",
  category: "Music",
  description: "Move current songs into other position in queue",
  usage: "<prefix>move <queue number>",
  option: ""
};
