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

  const resumeEmbed = new Discord.MessageEmbed()
    .setAuthor(
      "Resume",
      "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fplay.png?v=1598773025944"
    )
    .setColor("#7EB9FF")
    .setDescription(`${song.title}`)
    .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
    .setFooter(`user: ${message.member.user.username}`);

  if (!queue.playing) {
    queue.playing = true;
    queue.connection.dispatcher.resume();
    return queue.textChannel.send(resumeEmbed).catch(console.error);
  }

  return message.reply("Onii chan there is no pause song").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "resume",
  category: "Music",
  description: "Resume song",
  usage: "<prefix>resume",
  option: ""
};
