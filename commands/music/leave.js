exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  if (!message.guild.me.voice.channel) {
    return message.channel.send("I am not in a voice channel!");
  }
  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue) {
    serverQueue.connection.dispatcher.destroy();
    channel.leave();
    message.client.queue.delete(message.guild.id);
    serverQueue.textChannel
      .send("Onii chan i have left the channel. See you again")
      .catch(console.error);
    return;
  }
  channel.leave();
  message.client.queue.delete(message.guild.id);
  message.channel
    .send("Onii chan i have left the channel. See you again")
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "leave",
  category: "Music",
  description: "Make the bot leave the voice channel",
  usage: "<prefix>leave",
  option: ""
};
