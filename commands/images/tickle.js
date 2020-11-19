const fetch = require("node-fetch");

exports.run = async (client, message) => {

  const member = message.mentions.users.first();

  fetch("https://nekos.life/api/v2/img/tickle")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;
if (member){
  message.channel.send(`${message.member.user.username} is tickling ${member.username}`, {
    files: [image],
  });
} else {
      message.channel.send(`${message.member.user.username} is tickling someone`, {
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
  name: "tickle",
  category: "Images",
  description: "Random anime tickling gif",
  usage: "<prefix>tickle <mention/optional>",
  option: ""
};
