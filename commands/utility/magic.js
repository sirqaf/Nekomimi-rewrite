const fetch = require("node-fetch");

exports.run = async (client, message, args, level) => {
  const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : null;
  if (!url || !url.startsWith("http"))
    return message.channel.send(
      "You must provide a valid image URL to apply some ***m a g i c***  to."
    );
  message.channel.startTyping();
  fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${url}`)
    .then(res => res.json())
    .then(data => {
      if (!data.success)
        return message.channel.send(
          "Onii chan an error has occurred. Please ensure the URL you're providing is an image URL."
        );
      message.channel.stopTyping(true);
      return message.channel.send({ files: [data.message] });
    })
    .catch(err => {
     console.log(err);
      message.channel.stopTyping(true);
      return this.client.embed("Onii chan there is a problem with the API", message);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "magic",
  category: "Etc",
  description: "Add magic effect on image",
  usage: "<prefix>magic <image-url>",
  option: ""
};
