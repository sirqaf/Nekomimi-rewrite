const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const outcomes = [
    "Yes.", // Positive
    "No.", // Negative
    "Maybe.", // Neutral
    "Most certainly!", // Positive
    "Definitely not.", // Negative
    "Undoubtedly.", // Positive
    "Negative.", // Negative
    "Certainly not.", // Negative
    "Seems like my magic 8 ball is broken... Try again.",
    "I sure hope so!", // Positive
    "There is a good chance.", // Positive
    "Quite likely.", // Positive
    "I think so.", // Positive
    "I hope not.", // Negative
    "I hope so.", // Positive
    "Possibly.", // Neutral
    "Forget about it.", // Negative
    "Sry gtg", // Neutral
    "I highly doubt it.", // Negative
    "My sources say no.", // Negative
    "My sources say yes.", // Positive
    "All signs point to yes.", // Positive
    "Delete this and try again", // neutral
    "Outlook not so good.", // negative
    "Outlook good.", // positive
    "Pfff", // Negative
    "You may rely on it.", // Positive
    "Don't count on it.",
    "Maybe idk", // neutral
    "No. Why would you even ask such a thing?", // Negative
  ];

  if (args[0]) {
    const randomOutcome = outcomes.random();
    try {
      const embed = new Discord.MessageEmbed()
        .setTitle("Magic 8 Ball 🎱")
        .setDescription(`The 8 ball says:\n**${randomOutcome}**\n   ‍   `)
        .setColor("#7EB9FF")
        .setFooter(
          `Question asked by ${message.author.tag}`,
          message.author.displayAvatarURL
        );
      message.channel.send({ embed });
    } catch (error) {
      this.console.error(error);
      message.channel.send(
        `My magic 8 ball says: ${texts.general.error.replace(
          /{{err}}/g,
          error.message
        )}`
      );
    }
  } else {
    message.channel.send(
      `Onii chan are you unsure how to use this command? Use \`${client.config.settings.prefix}help 8ball\` to see how.`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "8ball",
  category: "Etc",
  description: "Ask magical 8ball",
  usage: "<prefix>8ball <question>",
  option: "",
};
