const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, message, args, level) => {
  try {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      const content = args.join(" ").toLowerCase();
      const toMute = message.guild.member(
        message.mentions.users.first() ||
          message.guild.members.cache.get(args[0])
      );
      const reason = args.slice(2).join(" ");
      if (!toMute)
        return message.channel.send(`Onii chan i cannot find the user`);

      let role = message.guild.roles.cache.find(
        (role) => role.name === "muted"
      );

      if (!args[0])
        return message.channel.send(
          "Onii chan please mention a member to mute"
        );
      if (!role)
        return message
          .reply(
            `Onii chan i couldn't find the role named "muted", im creating one now, please rerun the command.`
          )
          .then(() =>
            message.guild.roles.create({
              data: {
                name: "muted",
                color: "GREY",
                permissions: [],
              },
              reason: "mute",
            })
          );

      message.guild.channels.cache.forEach((channel) => {
        channel.updateOverwrite(role, {
          SEND_MESSAGES: false,
        });
      });

      let time = args[1];

      const muteEmbed = new Discord.MessageEmbed()
        .setColor("#7EB9FF")
        .setDescription(
          `${message.member.user.tag} has **muted** ${toMute.user.tag}`
        )
        .addField("Reason", `${reason}` || "none", true)

        const muteTimerEmbed = new Discord.MessageEmbed()
        .setColor("#7EB9FF")
        .setDescription(
          `${message.member.user.tag} has muted ${toMute.user.tag}`
        )
        .addField("Reason", `${reason}` || "none", true)
        .addField(`Time`, `${time}m` || "none", true);

        if (!time){
      message.channel.send(muteEmbed)
        } else {
      message.channel.send(muteTimerEmbed)
        }
        toMute.roles.add(role.id);
      const unmuteEmbed = new Discord.MessageEmbed()
        .setColor("#7EB9FF")
        .setDescription(
          `${message.member.user.tag} has **unmuted** ${toMute.user.tag}`
        );

        if (time){
      setTimeout(function () {
        toMute.roles.remove(role.id);
        message.channel.send(unmuteEmbed)
      }, ms(ms(time * 60000)));
    }
    } else {
      message.reply("Onii chan you do not have the permission");
    }
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with mute command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
};

exports.help = {
  name: "mute",
  category: "Moderation",
  description: "Mutes the specified user.",
  usage: "<prefix>mute @<user> <time/option(optional)>",
  option: "",
};
