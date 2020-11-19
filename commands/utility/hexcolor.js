const Discord = require("discord.js");

const validate = color => {
  if (!color || typeof color !== "string") return false;
  color = color.replace("#", "");

  switch (color.length) {
    case 3:
      return /^[0-9A-F]{3}$/i.test(color);
    case 6:
      return /^[0-9A-F]{6}$/i.test(color);
    case 8:
      return /^[0-9A-F]{8}$/i.test(color);
    default:
      return false;
  }
};

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0])
      return message.channel.send("Onii chan you need to input HEX code!");
    if (!validate(args.join(" ")))
      return message.reply("Onii chan that's not a valid HEX code!");

    message.channel.send(
      new Discord.MessageEmbed().setColor(args[0]).setTitle("HEX Color")
    );
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with hexcolor command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["hc"],
  permLevel: "User"
};

exports.help = {
  name: "hexcolor",
  category: "Utility",
  description: "View HEX code color",
  usage: "<prefix>hexcolor <hex code>",
  option: ""
};
