const Discord = require("discord.js");
const youtube = require("youtube-sr");

exports.run = async (client, message, args) => {
  if (!args.length) {
    return message.channel.send(
      `Onii chan you must state the song name, please refer ${client.config.settings.prefix}help play for details`
    );
  }
  if (message.channel.activeCollector) {
    return message.channel.send(
      "Onii chan a message collector is already active in this channel"
    );
  }
  if (!message.member.voice.channel) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  if (message.content.includes("https")) {
    return message.channel.send(
      `Onii chan please use ${client.config.settings.prefix}playlink command for url`
    );
  } else {
    const search = args.join(" ");

    try {
      message.channel.startTyping();
      const results = await youtube.search(search, { limit: 9 });

      let resultsEmbed = new Discord.MessageEmbed()
        .setColor("#7EB9FF")
        .setFooter("type 'cancel' to exit")
        .setDescription(
          results
            .map((video, index) => `**${index + 1}.** ${video.title}`)
            .join("\n")
        );
      var resultsMessage = await message.channel.send(resultsEmbed);
      message.channel.stopTyping();

      function filter(msg) {
        const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/g;
        return (
          pattern.test(msg.content) ||
          msg.content === "cancel" ||
          msg.content === "Cancel"
        );
      }

      message.channel.activeCollector = true;
      const response = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ["time"],
      });

      if (
        response.first().content === "cancel" ||
        response.first().content === "Cancel"
      ) {
        resultsMessage.delete();
        return (message.channel.activeCollector = false);
      }

      const reply = response.first().content;
      if (reply.includes(",")) {
        // multiple choice
        let songs = reply.split(",").map((str) => str.trim());

        for (let song of songs) {
          const choice = parseInt(song, 10);
          let track = results[choice - 1].url;
          await message.client.commands
            .get("playlink")
            .run(client, message, [track]);
        }
      } else {
        // single choice
        const choice = parseInt(response.first().content, 10);
        let track = results[choice - 1].url;
        message.client.commands.get("playlink").run(client, message, [track]);
      }
      message.channel.activeCollector = false;
      resultsMessage.delete();
      response.first().delete();
    } catch (error) {
      console.error(error);
      resultsMessage.delete();
      message.channel.send("Onii chan time is up");
      message.channel.activeCollector = false;
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Search and play youtube song",
  usage: "<prefix>play <name>",
  option: "",
};
