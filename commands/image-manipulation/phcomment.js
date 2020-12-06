const fetch = require("node-fetch");

exports.run = (client, message, args) => {
  var Attachment = message.attachments.array();
  if (!args[0] && Attachment[0] == null) {
    return message.channel.send("Onii chan please input an image/url");
  } else if (args[0] && Attachment[0] == null) {
    // direct url
    var file = args[0];
    var username = args[1];
    var text = args.join(" ").replace(args[0] + " " + args[1] + " ", "");
    phcomment(file);
  } else if (args[0] && Attachment[0]) {
    // attachment
    var username = args[0];
    var text = args.join(" ").replace(args[0] + " ", "");
    Attachment.forEach(function(attachment) {
      var file = attachment.url;
      phcomment(file);
    });
  }

  async function phcomment(file) {
    message.channel.startTyping();
    try {
      const data = await fetch(
        encodeURI(
          `https://nekobot.xyz/api/imagegen?type=phcomment&image=${file}&username=${username}&text=`
        ) + encodeURIComponent(text)
      );
      const result = await data.json();
      //console.log(data);
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
  name: "phcomment",
  category: "Image-manipulation",
  description: "Generate text into pornhub comment image",
  usage: "<prefix>phcomment <image/url> <username> <text>",
  option: ""
};
