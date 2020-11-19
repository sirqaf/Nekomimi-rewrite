const fetch = require("node-fetch");

exports.run = async (client, message) => {

  const member = message.mentions.users.first();

  fetch("https://waifu.pics/api/sfw/dance")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;
if (member){
  message.channel.send(`${message.member.user.username} is dancing with ${member.username}`, {
    files: [image],
  });
} else {
      message.channel.send(`${message.member.user.username} is dancing`, {
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
  name: "dance",
  category: "Images",
  description: "Random anime dancing gif",
  usage: "<prefix>dance <mention/optional>",
  option: ""
};
