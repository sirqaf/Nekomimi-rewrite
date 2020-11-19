// new guild joined
module.exports = (client, guild) => {
  client.logger.cmd(
    `[GUILD JOIN] ${guild.name} (${guild.id}) added Nekomimi. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`
  );
};
