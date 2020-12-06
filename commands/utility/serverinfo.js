const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    function checkDays(date) {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }

    const region = {
      brazil: ":flag_br: Brazil",
      "eu-central": ":flag_eu: Central Europe",
      singapore: ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      sydney: ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      london: ":flag_gb: London",
      amsterdam: ":flag_nl: Amsterdam",
      hongkong: ":flag_hk: Hong Kong",
      russia: ":flag_ru: Russia",
      southafrica: ":flag_za:  South Africa"
    };
    const embed = new Discord.MessageEmbed()
      .setAuthor("Server Information")
      .setThumbnail(message.guild.iconURL({ format: "png", size: 1024 }))
      .addField("• Name", message.guild.name, true)
      .addField("• ID", message.guild.id, true)
      .addField(
        "• Owner",
        `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
        true
      )
      .addField("• Region", region[message.guild.region], true)
      .addField("• Member/Bot", `${message.guild.memberCount}`, true)
      .addField("• Custom Emoji", message.guild.emojis.cache.size, true)
      .addField("• Channels", message.guild.channels.cache.size, true)
      .addField("• Roles", message.guild.roles.cache.size, true)
      .addField(
        "• Creation Date",
        `${message.channel.guild.createdAt
          .toUTCString()
          .substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`,
        true
      )
      .setThumbnail(message.guild.iconURL())
      .setColor("#7EB9FF");
    message.channel.send({ embed });
  } catch (err) {
    console.log(err);
    message.channel.send(
      "Onii chan there is a problem with serverinfo command"
    );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Utility",
  description: "View Server information",
  usage: "<prefix>serverinfo",
  option: ""
};
