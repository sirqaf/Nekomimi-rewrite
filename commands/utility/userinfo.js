const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    let user =
      message.mentions.users.first() ||
      client.users.resolve(args[0]) ||
      message.author;
    const member = message.guild.member(user);

    const inline = true;
    const resence = true;
    const status = {
      online: "online",
      idle: "idle",
      dnd: "do Not Disturb",
      offline: "offline/invisible"
    };
    const friendly = client.config.permLevels.find(l => l.level === level).name;

    // const member =
    //   message.mentions.members.first() ||
    //   message.guild.members.cache.get(args[0]) ||
    //   message.member;
    //const target = message.mentions.users.first() || message.author;
    const embed = new Discord.MessageEmbed()
      .setAuthor("User Information")
      .setThumbnail(
        user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setColor("#7EB9FF")
      .addField("• Username", `${member.user.tag}`, inline)
      .addField(
        "• Permission Level",
        `${level} - ${friendly.toLowerCase()}`,
        true
      )
      .addField("• Presence", `status[${user.presence.status}]`, true)
      .addField("• ID", `${user.id}`, true)
      .addField(
        "• Roles",
        `${member.roles.cache
          .map(roles => `${roles}`)
          .join(" ")
          .replace("@everyone", " ")
          .substr(0, 1024)}`,
        true
      )
      .addField(
        "• Status",
        `${user.presence.game ? user.presence.game.name : "None"}`,
        true
      )
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
