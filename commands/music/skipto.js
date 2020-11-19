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

  if (!args.length || isNaN(args[0])) {
    return message.channel.send(
      `Onii chan you did not type the number of song to be play, please refer ${process.env.PREFIX}help skipto for details`
    );
  }

  const song = queue.songs[0];
  if (!canModifyQueue(message.member)) return;

  if (args[0] > queue.songs.length)
    return message
      .reply(`Onii chan the queue only have ${queue.songs.length} songs`)
      .catch(console.error);

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
    .setAuthor(
      "Skip",
      "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fnext.png?v=1598773026526"
    )
    .setColor("#7EB9FF")
    .setDescription(`${song.title}`)
    .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);

  queue.textChannel.send(skiptoEmbed).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "skipto",
  category: "Music",
  description: "Skip now playing song by minimum vote of 2 user",
  usage: "<prefix>skip",
  option: ""
};
