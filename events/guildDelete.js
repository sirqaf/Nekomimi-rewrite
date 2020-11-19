// new guild left
module.exports = (client, guild) => {
  if (!guild.available) return;
  client.logger.cmd(
    `[GUILD LEAVE] ${guild.name} (${guild.id}) removed Nekomimi`
  );
  // remove stale data on enmap settings
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
};
