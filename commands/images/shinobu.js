const fetch = require("node-fetch");

exports.run = async (client, message) => {

  fetch("https://waifu.pics/api/sfw/shinobu")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(`${message.member.user.username} has discovered a new shinobu pic, nice taste`, {
        files: [image],
      });
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "shinobu",
  category: "Images",
  description: "Random shinobu oshino aka Kiss-Shot Acerola-Orion Heart-Under-Blade pic",
  usage: "<prefix>shinobu",
  option: ""
};
