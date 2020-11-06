exports.run = async (client, message) => {
  const msg = await message.channel.send("Ping chan?");
  msg.edit(
    `Yosh! Latency is ${
      m.createdTimestamp - message.createdTimestamp
    }ms. API Latency is ${Math.round(client.ws.ping)}ms`
  );
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "ping",
  category: "Utility",
  description: "Check Bot latency",
  usage: "<prefix>ping",
  option: "",
};
