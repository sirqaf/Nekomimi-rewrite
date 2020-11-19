const fetch = require("node-fetch");

exports.run = async (client, message) => {

  fetch("https://api.lolis.life/kawaii")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(`${message.member.user.username} has discovered a new loli, urmm FBI?`, {
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
  name: "loli",
  category: "Images",
  description: "Random loli pic",
  usage: "<prefix>loli",
  option: ""
};
