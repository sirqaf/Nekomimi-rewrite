const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {
  const user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.author;
  const avatar = user.displayAvatarURL({
    dynamic: false,
    format: "jpg",
    size: 2048,
  });
  const data = await Canvacord.gay(avatar);
  return message.channel.send(new MessageAttachment(data, "rainbow.png"));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  cooldown: 15,
  permLevel: "User",
};

exports.help = {
  name: "rainbow",
  category: "Image-manipulation",
  description: "Convert image into gay picture",
  usage: "<prefix>rainbow <image/mention user>",
  option: "",
};