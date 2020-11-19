const fetch = require("node-fetch");

exports.run = async (client, message) => {

  var url = [
    "https://waifu.pics/api/sfw/slap",
    "https://nekos.life/api/v2/img/slap",
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
if (member){
  message.channel.send(`${message.member.user.username} is slapping ${member.username}, so outrageous`, {
    files: [image],
  });
} else {
      message.channel.send(`${message.member.user.username} is slapping someone, so outrageous`, {
        files: [image],
      });
    }
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
  name: "slap",
  category: "Images",
  description: "Random anime slapping gif",
  usage: "<prefix>slap <mention/optional>",
  option: ""
};
