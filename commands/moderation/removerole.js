const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        "Onii chan i don`t have MANAGE_ROLES permission, give me pwease"
      );

    if (!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR"))
      return message.channel.send(
        "Onii chan you don't have permissions for that!"
      );

    const needsRole =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[0]);

    const role =
      message.guild.roles.cache.find(
        role => role.name === args.join(" ").slice(23)
      ) || message.mentions.roles.first();

    if (!needsRole)
      return message.channel.send("Onii chan user wasn't found in this guild");
    if (!role)
      return message.channel.send("Onii chan please provide a valid role");

    needsRole.roles.remove(role.id);

    const removeRole1Embed = new Discord.MessageEmbed()
      .setColor("#7EB9FF")
      .setDescription(
        `Successfully **remove** ${needsRole} from ${role.name} role`
      );
    message.channel.send(removeRole1Embed);

    // log to modlog channel
    let targetChannel = client.channels.cache.get(
      process.env.MODLOG_CHANNEL_ID
    );

    if (targetChannel) {
      let removeRole2Embed = new Discord.MessageEmbed()
        .setTitle("Remove Role")
        .setColor("#7EB9FF")
        .setDescription(
          `**Name**: ${needsRole}\n**ID**: ${needsRole.id}\n**Role**: ${role.name}\n**Moderator**: ${message.author.username}`
        );
      targetChannel.send(removeRole2Embed);
    }
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with addrole command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "removerole",
  category: "Moderation",
  description: "Unassign role from specified user",
  usage: "<prefix>removerole <user> <role name/id>",
  option: ""
};
