// bot log
module.exports = async (client) => {
  client.logger.log(
    `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`,
    "ready"
  );
  client.user.setActivity(`${client.settings.get("default").prefix}help`, {
    type: "PLAYING",
  });
};
