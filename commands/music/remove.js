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
      `Onii chan you did not type the number of song to be remove, please refer ${process.env.PREFIX}help remove for details`
    );
  }
  const song = queue.songs.splice(args[0] - 1, 1);

  const removeEmbed = new Discord.MessageEmbed()
    .setAuthor(
      "Remove",
      "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fcancel-2.png?v=1598958468391"
    )
    .setColor("#7EB9FF")
    .setDescription(`${song[0].title}`)
    .setThumbnail(`https://img.youtube.com/vi/${song[0].id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);
  queue.textChannel.send(removeEmbed).catch(console.error);
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
