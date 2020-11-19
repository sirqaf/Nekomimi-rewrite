// Does not rebooting server, only bot
exports.run = async (client, message, args, level) => {
  await message.channel.send(
    "Onii chan im restarting..\n(approximately 15 seconds)"
  );
  await Promise.all(client.commands.map((cmd) => client.unloadCommand(cmd)));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  cooldown: 30,
  permLevel: "Bot Admin",
};

exports.help = {
  name: "reboot",
  category: "Moderation",
  description: "Restart Nekomimi and relogin",
  usage: "<prefix>reboot",
  option: "",
};
