const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, message, args, level) => {
  try {
    if (!ms(args[0])) return message.reply("Onii chan you have to input a valid time!");
    if (!args[1])
      return message.reply("Onii chan you have to input the text to remind you of!");

    setTimeout(async () => {
      let embed = new client.Embed("normal", {
        title: "Reminder",
        description: args.slice(1).join(" ")
      });

      message.author.send(embed);
    }, ms(args[0]));

    message.channel.send(
      "Reminder set!\nNekomimi reminding you in " +
        ms(ms(args[0]), { long: true }) +
        "\nI will remind you in your DMS!"
    );
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with reminder command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "reminder",
  category: "Utility",
  description: "Imouto reminder by DM",
  usage: "<prefix>remind <time> <text>",
  option: ""
};
