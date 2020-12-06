const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    if (!args.join(" "))
      return message.reply(`Onii chan you need to give me a text, see ${client.config.settings.prefix}help poll for details`);

    let pollEmbed = new Discord.MessageEmbed()
      .setTitle(args.join(" "))
      .setDescription("Poll created by " + message.author.tag)
      .setColor("#7EB9FF");

    let msg = await message.channel.send(pollEmbed);

    await msg.react("👍");
    await msg.react("👎");
    await msg.react("🤷");
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with poll command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "poll",
  category: "Utility",
  description: "Starts a question poll",
  usage: "<prefix>poll <question>",
  option: ""
};
