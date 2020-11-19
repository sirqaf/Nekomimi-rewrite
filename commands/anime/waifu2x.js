const deepai = require("deepai");
deepai.setApiKey(process.env.DEEPAI_API_KEY); // api limit to 10000 req

exports.run = (client, message, args) => {
  if (!args[0]) {
    var Attachment = message.attachments.array();
    if (Attachment[0] == null) {
      message.channel.send(
        "Onii chan please input an image/url you want to upscale for"
      );
    } else {
      //console.log(Attachment)
      Attachment.forEach(function(attachment) {
        var link = attachment.url;
        console.log(link);

        waifu2x(link);
      });
    }
  } else {
    var link = args[0];
    console.log(link);
    waifu2x(link);
  }
  message.channel.startTyping();
  async function waifu2x(link) {
    var resp = await deepai.callStandardApi("waifu2x", {
      image: link
    });

    message.channel.send({
      files: [resp.output_url]
    });
    message.channel.stopTyping(true);
    console.log(resp);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "waifu2x",
  category: "Anime",
  description: "Upscale your waifu resolution by 2x using AI",
  usage: "<prefix>waifu2x <attachment/url>",
  option: ""
};
