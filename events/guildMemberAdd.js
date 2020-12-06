// new member join guilds
module.exports = (client, member) => {
  if (client.config.settings.welcomeEnabled !== "true") return;

  const welcomeMessage = client.config.settings.welcomeMessage
    .replace("{{user}}", member.user.tag)
    .replace("{{guild}}", member.guild.name);

  member.guild.channels.cache
    .find(c => c.name === client.config.settings.welcomeChannel)
    .send(welcomeMessage);
};
