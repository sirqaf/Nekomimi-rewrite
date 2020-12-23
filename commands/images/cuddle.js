const fetch = require("node-fetch");

exports.run = async (client, message) => {
  const member = message.mentions.users.first();
  message.channel.startTyping();
  fetch("https://nekos.life/api/v2/img/cuddle")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;
      if (member) {
        message.channel.send(
          `${message.member.user.username} is cuddling with ${member.username}`,
          {
            files: [image],
          }
        );
      } else {
        message.channel.send(
          `${message.member.user.username} is cuddling with someone`,
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
  name: "cuddle",
  category: "Images",
  description: "Random anime cuddling gif",
  usage: "<prefix>cuddle <mention/optional>",
  option: "",
};
