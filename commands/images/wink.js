const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  fetch("https://waifu.pics/api/sfw/wink")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(
        `${message.member.user.username} wink without any particular reason`,
        {
          files: [image],
        }
      );
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
  name: "wink",
  category: "Images",
  description: "Random anime wink gif",
  usage: "<prefix>wink",
  option: "",
};
