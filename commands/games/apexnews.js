const axios = require("axios");
const Discord = require("discord.js");
const mozambiqueToken = process.env.MOZAMBIQUE_API_KEY;

exports.run = async (client, message, args, level) => {
  const url = `https://api.mozambiquehe.re/news?lang=en-us&auth=${mozambiqueToken}`;

  axios
    .get(url)
    .then(response => {
      const data = response.data;

      for (let i = 0; i < 3; i++) {
        const embed = new Discord.MessageEmbed()
          .setColor("#7EB9FF")
          .setAuthor("Apex Legends News"
          )
          .setTitle(data[i].title)
          .setURL(data[i].link)
          .setDescription(
            `${data[i].short_desc} \n\n` + "Click the **title** for more info."
          )
          .setImage(data[i].img)
          .setFooter("apex legends","https://i.imgur.com/MZn5ZXy.png")

        message.channel.send(embed);
      }
    })
    .catch(error => {
      console.log(error);
      message.channel.send("Onii chan there is a problem with apexnews command");
    })
    .then(() => {
      message.channel.stopTyping();
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "apexnews",
  category: "Games",
  description: "Shows latest apex legends news",
  usage: "<prefix>apexnews",
  option: ""
};
