const math = require("mathjs");

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0])
      return message.channel.send(
        `Onii chan you need to give me an equation, see ${client.config.settings.prefix}help calculator for details`
      );

    message.channel.send(
      "Beep boop, the answer is " + math.evaluate(args.join(" "))
    );
  } catch (err) {
    console.log(err);
    message.channel.send(
      "Onii chan there is a problem with calculator command"
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["calc"],
  permLevel: "User"
};

exports.help = {
  name: "calculator",
  category: "Utility",
  description: "Calculate numbers",
  usage: "<prefix>calculator <equations>",
  option: ""
};
