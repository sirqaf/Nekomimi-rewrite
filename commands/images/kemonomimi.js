const fetch = require("node-fetch");

exports.run = async (client, message) => {

  fetch("https://nekos.life/api/v2/img/kemonomimi")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(`${message.member.user.username} has discovered a new kemonomimi`, {
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
  name: "kemonomimi",
  category: "Images",
  description: "Random kemonomimi pic",
  usage: "<prefix>kemonomimi",
  option: ""
};
