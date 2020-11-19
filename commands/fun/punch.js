const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    let member = message.mentions.members.first();
    let embed;

    if (member) {
      if (Math.random() < 0.5) {
        embed = new Discord.MessageEmbed()
          .setTitle(
            message.author.username + " punches " + member.user.username
          )
          .setColor("#7EB9FF")
          .setDescription(
            message.author.username +
              " punched " +
              member.user.username +
              "!\n" +
              message.author.username +
              " didn't knock " +
              member.user.username +
              " out!, pfff"
          );
      } else {
        embed = new Discord.MessageEmbed()
          .setTitle(
            message.author.username + " punches " + member.user.username
          )
          .setColor("#7EB9FF")
          .setDescription(
            message.author.username +
              " punched " +
              member.user.username +
              " and managed to knock " +
              member.user.username +
              " out!, subarashii"
          );
      }
    } else
      message.reply(
        "Onii chan you need to mention the person you want to punch!"
      );

    message.channel.send(embed);
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with punch command")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "punch",
  category: "Etc",
  description: "Punches a specified member",
  usage: "<prefix>punch <username>",
  option: ""
};
