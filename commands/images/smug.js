const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  var url = [
    "https://waifu.pics/api/sfw/smug",
    "https://nekos.life/api/v2/img/smug",
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
        `${message.member.user.username} was feeling smug without any particular reason`,
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
  name: "smug",
  category: "Images",
  description: "Random anime smug gif",
  usage: "<prefix>smug",
  option: "",
};
