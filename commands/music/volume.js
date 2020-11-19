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
      `Onii chan you did not type the number of volume, please refer ${process.env.PREFIX}help volume for details`
    );
  }
  if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
    return message.channel
      .send("Onii chan please use a number between 0 - 100.")
      .catch(console.error);

  queue.volume = args[0];
  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  const volumeEmbed = new Discord.MessageEmbed()
    .setAuthor(
      "Volume",
      "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fmedium-volume.png?v=1598815964050"
    )
    .setDescription(`set to [ **${args[0]}** ]`)
    .setColor("#7EB9FF")
    .setFooter(`user: ${message.member.user.username}`);

  return queue.textChannel.send(volumeEmbed).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "volume",
  category: "Music",
  description: "Set the volume",
  usage: "<prefix>volume <value/option>",
  option: "1-100"
};
