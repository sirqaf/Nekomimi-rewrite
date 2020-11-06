const fetch = require("node-fetch");

exports.run = async (message) => {
  fetch("https://nekos.life/api/v2/img/wallpaper")
    .then((response) => {
      if (!response.ok)
        return message.channel.send("Onii chan an API error has occurred");
      return response.json();
    })
    .then((data) => {
      const image = data.url;

      message.channel.send(
        `${message.member.user.username} has discovered a new wallpaper`,
        {
          files: [image],
        }
      );
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["aw"],
  permLevel: "User",
};

exports.help = {
  name: "animewallpaper",
  category: "Images",
  description: "Random anime wallpaper",
  usage: "<prefix>animewallpaper",
  option: "",
};
