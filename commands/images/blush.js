const fetch = require("node-fetch");

exports.run = async (client, message) => {
  message.channel.startTyping();
  fetch("https://waifu.pics/api/sfw/blush")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(
        `${message.member.user.username} is blushing without any particular reason`,
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
  name: "blush",
  category: "Images",
  description: "Random anime blushing gif",
  usage: "<prefix>blush",
  option: "",
};
