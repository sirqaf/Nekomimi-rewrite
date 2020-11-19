exports.run = async (client, message, args, level) => {
  
  try {
    if (!args || args.length < 1)
      return message.reply("Onii chan you must provide a command to reload!");

    let response = await client.unloadCommand(args[0]);
    if (response) return message.reply(`Error unloading: ${response}`);

    response = client.loadCommand(args[0]);
    if (response) return message.reply(`Error loading: ${response}`);

    client.logger.log(`Reloading Command: ${args[0]}`);
    message.reply(`Onii chan the command \`${args[0]}\` has been reloaded`);
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with reload command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "reload",
  category: "Moderation",
  description: "Reload modified commands",
  usage: "<prefix>reload <command>",
  option: ""
};
