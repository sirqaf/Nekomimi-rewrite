const fetch = require("node-fetch");

exports.run = async (client, message) => {

  var url = [
    "https://waifu.pics/api/sfw/hug",
    "https://nekos.life/api/v2/img/hug",
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
  message.channel.send(`${message.member.user.username} is hugging ${member.username}`, {
    files: [image],
  });
} else {
      message.channel.send(`${message.member.user.username} is hugging someone`, {
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
  name: "hug",
  category: "Images",
  description: "Random anime hugging gif",
  usage: "<prefix>hug <mention/optional>",
  option: ""
};
