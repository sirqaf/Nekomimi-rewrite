const fetch = require("node-fetch");

exports.run = (client, message, args) => {
  if (!args[0]) {
    var Attachment = message.attachments.array();
    if (Attachment[0] == null) {
      message.channel.send("Onii chan please input an image/url");
    } else {
      // attachment
      Attachment.forEach(function(attachment) {
        var file = attachment.url;
        magic(file);
      });
    }
  } else {
    // direct url
    var file = args[0];
    magic(file);
  }

  async function magic(file) {
    message.channel.startTyping();
    try {
      const data = await fetch(
        encodeURI(`https://nekobot.xyz/api/imagegen?type=magik&image=${file}`)
      );
      const result = await data.json();

      if (result.status === 200) {
        message.channel.send({
          files: [result.message]
        });
        console.log(result);
      } else {
        message.channel.send("Onii chan that image/url cannot be process");
      }
    } catch (error) {
      message.channel.send("Onii chan please insert a valid image/url");
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
  cooldown: 15,
  permLevel: "User"
};

exports.help = {
  name: "magic",
  category: "Image-manipulation",
  description: "Add ***m a g i c*** effect on image",
  usage: "<prefix>magic <image/url>",
  option: ""
};
