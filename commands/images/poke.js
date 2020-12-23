const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  var url = [
    "https://waifu.pics/api/sfw/poke",
    "https://nekos.life/api/v2/img/poke",
  ];
  var randomUrl = url[Math.floor(Math.random() * url.length)];
  const member = message.mentions.users.first();

  fetch(randomUrl)
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;
      if (member) {
        message.channel.send(
          `${message.member.user.username} is poking ${member.username}`,
          {
            files: [image],
          }
        );
      } else {
        message.channel.send(
          `${message.member.user.username} is poking someone`,
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
  name: "poke",
  category: "Images",
  description: "Random anime poking gif",
  usage: "<prefix>poke <mention/optional>",
  option: "",
};
