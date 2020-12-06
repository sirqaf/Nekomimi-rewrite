const Discord = require("discord.js");
const { canModifyQueue } = require("../../modules/musicModifyQueue");

exports.run = (client, message, args) => {
  const voice = message.member.voice.channel;
  if (!voice) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) {
    return message.channel.send("Onii chan there is no music playing");
  }

  if (!args.length || isNaN(args[0])) {
    return message.channel.send(
      `Onii chan you did not type the number of song to be play, please refer ${client.config.settings.prefix}help skipto for details`
    );
  }

  const song = queue.songs[0];
  if (!canModifyQueue(message.member)) return;

  if (args[0] > queue.songs.length)
    return message.channel.send(
      `Onii chan the queue only have ${queue.songs.length} songs`
    );

  queue.playing = true;
  if (queue.loop) {
    for (let i = 0; i < args[0] - 2; i++) {
      queue.songs.push(queue.songs.shift());
    }
  } else {
    queue.songs = queue.songs.slice(args[0] - 2);
  }
  queue.connection.dispatcher.end();
  const skiptoEmbed = new Discord.MessageEmbed()
    .setAuthor("Skip", "https://i.imgur.com/dqPRC1O.png")
    .setColor("#7EB9FF")
    .setDescription(`${song.title}`)
    .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);

  queue.textChannel.send(skiptoEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  cooldown: 5,
  permLevel: "User"
};

exports.help = {
  name: "skipto",
  category: "Music",
  description: "Skip current playing song",
  usage: "<prefix>skipto",
  option: ""
};
