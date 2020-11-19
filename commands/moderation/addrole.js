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
    if (needsRole.roles.cache.some(r => role.id === r.id))
      return message.channel.send("Onii chan user already has that role");

    needsRole.roles.add(role.id);

    const addRole1Embed = new Discord.MessageEmbed()
      .setColor("#7EB9FF")
      .setDescription(
        `Successfully **add** ${needsRole} into ${role.name} role`
      );
    message.channel.send(addRole1Embed);

    // log to modlog channel
    let targetChannel = client.channels.cache.get(
      process.env.MODLOG_CHANNEL_ID
    );

    if (targetChannel) {
      let addRole2Embed = new Discord.MessageEmbed()
        .setTitle("Add Role")
        .setColor("#7EB9FF")
        .setDescription(
          `**Name**: ${needsRole}\n**ID**: ${needsRole.id}\n**Role**: ${role.name}\n**Moderator**: ${message.author.username}`
        );
      targetChannel.send(addRole2Embed);
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
  name: "addrole",
  category: "Moderation",
  description: "Assign a role to the specified user",
  usage: "<prefix>addrole <user> <role name/id>",
  option: ""
};
