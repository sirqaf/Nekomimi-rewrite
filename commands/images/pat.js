const fetch = require("node-fetch");

exports.run = async (client, message) => {

  var url = [
    "https://waifu.pics/api/sfw/pat",
    "https://nekos.life/api/v2/img/pat",
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
  message.channel.send(`${message.member.user.username} is patting ${member.username}, yoshh yosh`, {
    files: [image],
  });
} else {
      message.channel.send(`${message.member.user.username} is patting someone, yoshh yosh`, {
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
  name: "pat",
  category: "Images",
  description: "Random anime patting gif",
  usage: "<prefix>pat <mention/optional>",
  option: ""
};
