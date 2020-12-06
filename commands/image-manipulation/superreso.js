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
      Attachment.forEach(function(attachment) {
        var link = attachment.url;
        superreso(link);
      });
    }
  } else {
    var link = args[0];
    superreso(link);
  }

  async function superreso(link) {
    message.channel.startTyping();
    var resp = await deepai.callStandardApi("torch-srgan", {
      image: link
    });

    message.channel.send({
      files: [resp.output_url]
    });
    message.channel.stopTyping();
    console.log(resp);
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
  name: "superreso",
  category: "Image-manipulation",
  description:
    "Upscale your image resolution by 4x using AI. Best results on irl picture",
  usage: "<prefix>superreso <image/url>",
  option: ""
};
