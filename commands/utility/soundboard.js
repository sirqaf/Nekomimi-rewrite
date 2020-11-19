const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.channel.activeCollector) {
    return message.channel.send(
      "Onii chan a message collector is already active in this channel."
    );
  }
  const soundboardEmbed = new Discord.MessageEmbed()
    .setAuthor("Nekomimi Soundboard")
    .setColor("#7EB9FF")
    .setThumbnail(
      client.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
    );

  try {
    var soundboardMessage = await message.channel.send(soundboardEmbed);
    await soundboardMessage.react("1️⃣");
  } catch (error) {
    console.error(error);
  }

  const filter = (reaction, user) => user.id !== message.client.user.id;
  var collector = soundboardMessage.createReactionCollector(filter, {
    time: 30000
  });

  collector.on("collect", (reaction, user) => {
    const member = message.guild.member(user);

    switch (reaction.emoji.name) {
      case "1️⃣":
        reaction.users.remove(user).catch(console.error);
        try {
          if (message.member.voice.channel) {
            message.channel
              .send("Onii chan i want to say something")
              .then(msg => {
                message.member.voice.channel.join().then(connection => {
                  const dispatcher = connection.play(
                    "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fonii%20chan%20suki.mp3?v=1599318413053",
                    { highWaterMark: 50 }
                  );
                  dispatcher.on("finish", () => {
                    message.member.voice.channel.leave();
                    msg.edit("💙");
                  });
                });
              })
              .catch(console.error);
          } else {
            return message.channel.send(
              "Onii chan you`re not in a voice channel"
            );
          }
        } catch (err) {
          console.log(err);
          return message.channel.send(
            "Onii chan there is a problem with daisuki command"
          );
        }
        collector.stop();
        break;

      case "2️⃣":
        try {
          reaction.users.remove(user).catch(console.error);
          if (message.member.voice.channel) {
            message.member.voice.channel.join().then(connection => {
              const dispatcher = connection.play(
                "https://cdn.glitch.com/a154c928-09a6-47a7-9ba2-c79cc6bb30d4%2Fnyaa.mp3?v=1580299881684"
              );
              const embed = new Discord.MessageEmbed()
                .setColor(0x7eb9ff)
                .setDescription("You have been blessed");
              message.channel.send(embed);
              dispatcher.on("finish", () => {
                message.member.voice.channel.leave();
              });
            });
          } else {
            return message.channel.send(
              "Onii chan you`re not in a voice channel"
            );
          }
        } catch (err) {
          console.log(err);
          message.channel.send("Onii chan there is a problem with nya command");
        }
        collector.stop();
        break;

      default:
        reaction.users.remove(user).catch(console.error);
        break;
    }
  });

  collector.on("end", () => {
    soundboardMessage.reactions.removeAll().catch(console.error);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sb"],
  permLevel: "User"
};

exports.help = {
  name: "soundboard",
  category: "Utility",
  description: "Nekomimi sound",
  usage: "<prefix>soundboard",
  option: ""
};
