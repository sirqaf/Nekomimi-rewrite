const deepai = require("deepai");
deepai.setApiKey(process.env.DEEPAI_API_KEY);// api limit to 10000 req

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

        superreso(link);
      });
    }
  } else {
    var link = args[0];
    console.log(link);
    superreso(link);
  }
  message.channel.startTyping();
  async function superreso(link) {
    var resp = await deepai.callStandardApi("torch-srgan", {
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
  name: "superreso",
  category: "Utility",
  description: "Upscale your image resolution by 4x using AI. Best results on irl picture",
  usage: "<prefix>superreso <attachment/url>",
  option: ""
};
