const fetch = require("node-fetch");

exports.run = async (client, message) => {

  const member = message.mentions.users.first();

  fetch("https://waifu.pics/api/sfw/lick")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;
if (member){
  message.channel.send(`${message.member.user.username} is licking ${member.username}, euww`, {
    files: [image],
  });
} else {
      message.channel.send(`${message.member.user.username} is licking someone, euww`, {
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
  name: "lick",
  category: "Images",
  description: "Random anime licking gif",
  usage: "<prefix>pat <mention/optional>",
  option: ""
};
