const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  const member = message.mentions.users.first();

  fetch("https://waifu.pics/api/sfw/highfive")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;
      if (member) {
        message.channel.send(
          `${message.member.user.username} highfive ${member.username}`,
          {
            files: [image],
          }
        );
      } else {
        message.channel.send(
          `${message.member.user.username} highfive someone`,
          {
            files: [image],
          }
        );
      }
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  message.channel.stopTyping();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "highfive",
  category: "Images",
  description: "Random anime highfive gif",
  usage: "<prefix>cuddle <mention/optional>",
  option: "",
};
