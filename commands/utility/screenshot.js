const fetch = require("node-fetch");

exports.run = (client, message, args) => {
  if (!args[0]) {
    return message.channel.send("Onii chan please state url");
  }

  if (args.includes("http")) {
    var url = args[0];
    screenshot(url);
  } else {
    url = "https://" + args[0];
    screenshot(url);
  }

  async function screenshot(url) {
    message.channel.startTyping();
    try {
      const { data } = await fetch(
        `https://image.thum.io/get/width/1920/crop/1080/noanimate/png/${url}`
      );
      message.channel.send({
        files: [{ attachment: data }]
      });
    } catch (error) {
      message.channel.send("Onii chan please insert a valid image/url");
      console.log(error);
    }
    message.channel.stopTyping();
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
  name: "screenshot",
  category: "Image-manipulation",
  description: "Screenshot website of given url",
  usage: "<prefix>screenshot <url>",
  option: ""
};
