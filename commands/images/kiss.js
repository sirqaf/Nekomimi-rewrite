const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  var url = [
    "https://waifu.pics/api/sfw/kiss",
    "https://nekos.life/api/v2/img/kiss",
  ];
  var randomUrl = url[Math.floor(Math.random() * url.length)];
  const member = message.mentions.users.first();

  fetch(randomUrl)
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;
      if (member) {
        message.channel.send(
          `${message.member.user.username} is kissing ${member.username}, smooch~`,
          {
            files: [image],
          }
        );
      } else {
        message.channel.send(
          `${message.member.user.username} is kissing someone, smooch~`,
          {
            files: [image],
          }
        );
      }
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
  name: "kiss",
  category: "Images",
  description: "Random anime kissing gif",
  usage: "<prefix>kiss <mention/optional>",
  option: "",
};
