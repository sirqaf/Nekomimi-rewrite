const fetch = require("node-fetch");

exports.run = async (client, message) => {

  fetch("https://waifu.pics/api/sfw/cringe")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(`${message.member.user.username} was feeling cringe without any particular reason`, {
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
  name: "cringe",
  category: "Images",
  description: "Random anime cringe gif",
  usage: "<prefix>cringe",
  option: ""
};
