// bot online log
module.exports = async (client) => {
  client.logger.log(
    `Logged in as ${client.user.tag} | ${client.users.cache.size} users | ${client.guilds.cache.size} servers`
  );
  client.user.setActivity("with sirqaf", { type: "PLAYING" });

  let targetChannel = client.channels.cache.get(client.config.settings.modLogChannelId);
  targetChannel.send("Onii chan im online");
};
