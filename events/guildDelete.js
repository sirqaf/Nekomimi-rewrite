// new guild left
const Discord = require("discord.js");

module.exports = (client, guild) => {
  if (!guild.available) return;
  client.logger.cmd(
    `[GUILD LEAVE] ${guild.name} (${guild.id}) removed Nekomimi`
  );
  let targetChannel = client.channels.cache.get(
    client.config.settings.modLogChannelId
  );
  if (targetChannel) {
    let guildRemoveEmbed = new Discord.MessageEmbed()
      .setTitle("Guild Leave")
      .setColor("#7EB9FF")
      .setDescription(
        `**Name**: ${guild.name} [ ${guild.id} ]\n**Owner**: ${guild.owner.user.tag} [ ${guild.owner.user.id} ]`
      );
    targetChannel.send(guildRemoveEmbed);
  }
};
