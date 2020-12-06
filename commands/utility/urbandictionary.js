const ud = require("urban-dictionary");
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    ud.term(args.join(" ")).then(async result => {
      if (!args[0])
        return message.channel.send(
          "Onii chan you need to provide a search term!"
        );
      let output = "";
      let entries = result.entries;
      let i = 1;

      if (entries == [])
        return message.channel.send(
          "Onii chan i didn't find any results for " + args.join(" ") + "."
        );

      Object.keys(entries).forEach(async pageID => {
        output += "\n" + i + ". " + entries[pageID].word;
        i++;
      });

      let chooseEmbed = new Discord.MessageEmbed()
        .setDescription(`${output}`)
        .setColor("#7EB9FF");
      let page = await client.awaitReply(message, chooseEmbed);
      if (isNaN(page)) return message.reply(page + " is not a number!");
      let embed = new Discord.MessageEmbed()
        .setTitle(entries[page - 1].word)
        .setDescription(
          "Definition:\n" +
            entries[page - 1].definition +
            "\n\nExample:\n" +
            entries[page - 1].example
        )
        .setColor("#7EB9FF");

      message.channel.send(embed);
    });
  } catch (err) {
    console.log(err);
    message.channel.send(
      "Onii chan there is a problem with urbandictionary command"
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ud"],
  permLevel: "User"
};

exports.help = {
  name: "urbandictionary",
  category: "Utility",
  description: "Search the urban dictionary",
  usage: "<prefix>urbandictionary <text>",
  option: ""
};
