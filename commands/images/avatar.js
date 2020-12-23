const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  var url = [
    "https://nekos.life/api/v2/img/avatar",
    "https://nekos.life/api/v2/img/waifu",
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
        `${message.member.user.username} has discovered a new profile picture, he has evolved into a weeb!`,
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
  name: "avatar",
  category: "Images",
  description: "Random anime avatar pic",
  usage: "<prefix>avatar",
  option: "",
};
