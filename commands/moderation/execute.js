const exec = require("child_process").exec;

exports.run = async (client, message, args, level) => { 
  try {
    const execute = (command) => {

      message.channel.send("Onii chan command has been executed in shell!");
      exec(command, (err, stdout, stderr) => {
        message.author.send(stdout).catch("Onii chan the output is too big!");
        if (stderr) {
          message.author.send("```"+stderr+"```");

          message.channel.send("Onii chan, shell error!");
        }
      });
    }

    execute(args.join(" "));
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with execute command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["exec"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "execute",
  category: "Moderation",
  description: "Executes a command in the shell",
  usage: "<prefix>execute <shell-command>",
  option: ""
};
