// new member join guilds
module.exports = (client, member) => {
  const settings = client.getSettings(member.guild);
  if (settings.welcomeEnabled !== "true") return;

  const welcomeMessage = settings.welcomeMessage
    .replace("{{user}}", member.user.tag)
    .replace("{{guild}}", member.guild.name);

  member.guild.channels.cache
    .find((c) => c.name === settings.welcomeChannel)
    .send(welcomeMessage)
    .catch(console.error);
};
