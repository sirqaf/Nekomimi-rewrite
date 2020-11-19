const { base64encode, base64decode } = require("nodejs-base64");

exports.run = async (client, message, args, level) => {
  try {
    switch (args[0]) {
      case "encode":
        if (!args.slice(1).join(" "))
          return message.reply("You need to provide the string to encode!");
        message.channel.send(base64encode(args.slice(1).join(" ")));
        break;
      case "decode":
        if (!args.slice(1).join(" "))
          return message.reply("You need to provide the string to decode!");
        message.channel.send(base64decode(args.slice(1).join(" ")));
        break;
      default:
        return message.reply(
          "You need to choose to encode or decode the string!"
        );
        break;
    }
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with base64 command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "base64",
  category: "Utility",
  description: "Encode or Decode base64 string",
  usage: "<prefix>base64 <encode/decode> <string>",
  option: ""
};
