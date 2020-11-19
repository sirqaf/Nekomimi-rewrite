const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    const inline = true;
    const resence = true;
    const status = {
      online: "online",
      idle: "idle",
      dnd: "do Not Disturb",
      offline: "offline/invisible"
    };
    const friendly = client.config.permLevels.find(l => l.level === level).name;

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const target = message.mentions.users.first() || message.author;
    const embed = new Discord.MessageEmbed()
      .setAuthor("User Information")
      .setThumbnail(
        target.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setColor("#7EB9FF")
      .addField("• Username", `${member.user.tag}`, inline)
      .addField("• Presence", `${status[member.user.presence.status]}`, true)
      .addField(
        "• Status",
        `${member.user.presence.activities.toString().toLowerCase()}` ||
          "custom",
        true
      )
      .addField("• ID", `${member.user.id.toLowerCase()}`, true)
      // .addField(
      //   "Roles",
      //   `${
      //     member.roles.cache
      //       .filter((r) => r.id !== message.guild.id)
      //       .map((roles) => `\`${roles.name}\``)
      //       .join(" **|** ") || "No Roles"
      //   }`,
      //   true
      // )
      .addField(
        "• Permission Level",
        `${level} - ${friendly.toLowerCase()}`,
        true
      )
      //.setFooter(`Information about ${member.user.username}`)
      // Embed mobile countermeasures
      .setFooter(
        "\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b"
      );

    message.channel.send(embed);
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with userinfo command");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "userinfo",
  category: "Utility",
  description: "Show user information",
  usage: "<prefix>userinfo",
  option: ""
};
