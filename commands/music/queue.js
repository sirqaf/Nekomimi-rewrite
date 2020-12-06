const Discord = require("discord.js");

exports.run = async (client, message) => {
  const voice = message.member.voice.channel;
  if (!voice) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) {
    return message.reply("Onii chan there is no music playing");
  }

  const description = queue.songs.map(
    (song, index) => `**${index + 1}.** ${Discord.escapeMarkdown(song.title)}`
  );

  let queueEmbed = new Discord.MessageEmbed()
    .setAuthor("Queue", "https://i.imgur.com/jlS7KOH.png")
    .setDescription(description)
    .setColor("#7EB9FF");

  const splitDescription = Discord.splitMessage(description, {
    maxLength: 2048,
    char: "\n",
    prepend: "",
    append: ""
  });

  splitDescription.forEach(async m => {
    queueEmbed.setDescription(m);
    message.channel.send(queueEmbed);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "queue",
  category: "Music",
  description: "Shows the current queue",
  usage: "<prefix>queue",
  option: ""
};
