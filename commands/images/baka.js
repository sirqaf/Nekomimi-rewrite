const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  const member = message.mentions.users.first();

  fetch("https://nekos.life/api/v2/img/baka")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;
      if (member) {
        message.channel.send(
          `${message.member.user.username} says baka to ${member.username} without a doubt`,
          {
            files: [image],
          }
        );
      } else {
        message.channel.send(
          `${message.member.user.username} says baka to someone without a doubt`,
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
  name: "baka",
  category: "Images",
  description: "Random anime baka gif",
  usage: "<prefix>baka <mention/optional>",
  option: "",
};
