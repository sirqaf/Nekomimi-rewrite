// todo: emoji no animated error
//https://cdn.discordapp.com/emojis/id.png
const { MessageAttachment } = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    let id = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(args[1]);
    if (args[0] === "static" || args[0] === "animated") {
    if (!id) return message.reply("Onii chan you didn't input a valid emoji or it is a default Discord emote");
    switch (args[0]) {
      case "animated":
        message.channel.send(new MessageAttachment("/" + id + ".gif"));
        break;
      case "static":
        message.channel.send(new MessageAttachment("https://cdn.discordapp.com/emojis/" + id + ".png"));
        break;
      // default:
      //   message.reply("You need to say what type of emoji it is!");
      //   break;
    }
  } else {
    message.channel.send("Onii chan you must you must input type of emoji, see -help emojiimage for details.")
  }
  } catch (err) {
    console.log(err)
    message.channel.send("Onii chan there is a problem with emoji command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ei"],
  permLevel: "User"
};

exports.help = {
  name: "emojiimage",
  category: "Utility",
  description: "Returns the image of the specified emoji",
  usage: "<prefix>emojiimage <static/animated> <emoji>",
  option: ""
};
