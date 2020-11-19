const fetch = require("node-fetch");

exports.run = async (client, message) => {

  fetch("https://nekos.life/api/v2/img/gecg")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(`${message.member.user.username} gonna support for genetically engineered cat girl, naisuu!`, {
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
  name: "gecg",
  category: "Images",
  description: "Random genetically engineered cat girl pic",
  usage: "<prefix>gecg",
  option: ""
};
