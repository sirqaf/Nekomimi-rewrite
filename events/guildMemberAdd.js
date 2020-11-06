// new member join guilds
module.exports = (client, member) => {
  const settings = client.getSettings(member.guild);
  if (settings.welcomeEnabled !== "true") return;
  // replace placeholder with data
  const welcomeMessage = settings.welcomeMessage.replace(
    "{{user}}",
    member.user.tag
  );
  // send welcome message
  member.guild.channels.cache
    .find((c) => c.name === settings.welcomeChannel)
    .send(welcomeMessage)
    .catch(console.error);
};
