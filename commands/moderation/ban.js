const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  if (!message.member.hasPermission(r => ["Administrator"].includes(r.name)))
    return message.reply(
      "Gomenasai, Onii chan you don't have permissions to use this!"
    );
  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!member)
    return message.reply(
      "Onii chan please mention a valid member of this server"
    );
  if (!member.bannable)
    return message.reply(
      "Onii chan I cannot kick this user! Do they have a higher role? Do I have kick permissions?"
    );
  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason provided";
  await member
    .ban(reason)
    .catch(error =>
      message.channel.send(
        `Gomenasai ${message.author} I couldn't ban because of ${error}`
      )
    );
  
  const ban1Embed = new Discord.MessageEmbed()
    .setColor("#7EB9FF")
    .setDescription(
      `${member.user.tag} has been **banned** by ${message.author.tag}`
    )
    .addField("Reason", `${reason}` || "none", true);
  message.channel.send(ban1Embed);
  
  // log to modlog channel
  let targetChannel = client.channels.cache.get(process.env.MODLOG_CHANNEL_ID);

  if (targetChannel) {
    let ban2Embed = new Discord.MessageEmbed()
      .setTitle("Ban")
      .setColor("#7EB9FF")
      .setDescription(
        `**Name**: ${message.mentions.members.first}\n**ID**: ${member.user.id}\n**Reason**: ${reason}\n**Moderator**: ${message.author.username}`
      );

    targetChannel.send(ban2Embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Ban specified member",
  usage: "<prefix>ban <username>",
  option: ""
};
