// new guild left
module.exports = (client, guild) => {
  if (!guild.available) return;
  client.logger.cmd(
    `[GUILD LEAVE] ${guild.name} (${guild.id}) removed Nekomimi`
  );
};
