const fetch = require("node-fetch");

exports.run = (client, message, args) => {
  if (!args) {
    message.channel.send("Onii chan please input some text");
  } else {
    var text = args.join(" ");
    changemymind(text);
  }

  async function changemymind(text) {
    message.channel.startTyping();
    try {
      const data = await fetch(
        `https://nekobot.xyz/api/imagegen?type=changemymind&text=` +
          encodeURIComponent(text)
      );
      const result = await data.json();

      if (result.status === 200) {
        message.channel.send({
          files: [result.message]
        });
        console.log(result);
      } else {
        message.channel.send("Onii chan there is a problem with API");
      }
    } catch (error) {
      message.channel.send("Onii chan please insert a valid text");
      console.log(error);
    }
    message.channel.stopTyping();
    message.delete();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  cooldown: 10,
  permLevel: "User"
};

exports.help = {
  name: "changemymind",
  category: "Image-manipulation",
  description: "Generate text into change my mind meme image",
  usage: "<prefix>changemymind <text>",
  option: ""
};
