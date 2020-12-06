const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {

  if (!message.member.hasPermission((r) => ["Administrator"].includes(r.name)))
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
  if (!member.kickable)
    return message.reply(
      "Onii chan I cannot kick this user! Do they have a higher role? Do I have kick permissions?"
    );
  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason provided";
  await member
    .kick(reason)
    .catch((error) =>
      message.channel.send(
        `Gomenasai ${message.author} I couldn't kick because of ${error}`
      )
    );
  message.channel.send(
    `${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`
  );
// log to modlog channel
let targetChannel = client.channels.cache.get(client.config.settings.modLogChannelId);

if (targetChannel) {
  let kickEmbed = new Discord.MessageEmbed()
    .setTitle("Kick")
    .setColor("#7EB9FF")
    .setDescription(
      `**Name**: ${message.mentions.members.first}\n**ID**: ${member.user.id}\n**Reason**: ${reason}\n**Moderator**: ${message.author.username}`
    );

  targetChannel.send(kickEmbed);
}
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kick specified member",
  usage: "<prefix>kick <username>",
  option: "",
};
