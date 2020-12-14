// new guild joined
const Discord = require("discord.js");

module.exports = (client, guild) => {
  client.logger.cmd(
    `[GUILD JOIN] ${guild.name} (${guild.id}) added Nekomimi. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`
  );
  let targetChannel = client.channels.cache.get(
    client.config.settings.modLogChannelId
  );
  if (targetChannel) {
    let guildCreateEmbed = new Discord.MessageEmbed()
      .setTitle("Guild Join")
      .setColor("#7EB9FF")
      .setDescription(
        `**Name**: ${guild.name} [ ${guild.id} ]\n**Owner**: ${guild.owner.user.tag} [ ${guild.owner.user.id} ]`
      );
    targetChannel.send(guildCreateEmbed);
  }
};
