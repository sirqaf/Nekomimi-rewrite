const Discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  const settings = (message.settings = client.getSettings(message.guild));

  if (message.content.indexOf(settings.prefix) !== 0) return;
  const args = message.content
    .slice(settings.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.guild && !message.member)
    await message.guild.members.fetch(message.author);
  const level = client.permlevel(message);
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send(
      "Onii chan this command is unavailable in dm, please use in a guild"
    );

  // commands cooldown
  const cooldowns = client.cooldowns;
  if (!cooldowns.has(cmd)) {
    cooldowns.set(cmd, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(cmd);
  const cooldownAmount = (cmd.conf.cooldown || 2) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)}s before reusing the command.`
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // permission notice
  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel
        .send(`Onii chan you do not have permission to use this command.
    Your permission level is ${level} (${
        client.config.permLevels.find(l => l.level === level).name
      })
    This command requires level ${client.levelCache[cmd.conf.permLevel]} (${
        cmd.conf.permLevel
      })`);
    } else {
      return;
    }
  }
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  client.logger.cmd(
    `[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${
      message.author.username
    } (${message.author.id}) ran command ${cmd.help.name}`
  );
  cmd.run(client, message, args, level);
};
