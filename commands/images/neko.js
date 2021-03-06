const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  var url = [
    "https://waifu.pics/api/sfw/neko",
    "https://nekos.life/api/v2/img/neko",
  ];
  var randomUrl = url[Math.floor(Math.random() * url.length)];

  fetch(randomUrl)
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(
        `${message.member.user.username} has discovered a new neko nyaa~`,
        {
          files: [image],
        }
      );
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  message.channel.stopTyping();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "neko",
  category: "Images",
  description: "Random Neko pic",
  usage: "<prefix>neko",
  option: "",
};
