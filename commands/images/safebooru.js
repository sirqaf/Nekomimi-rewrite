const Discord = require("discord.js");
const booru = require("booru");

exports.run = async (client, message, args) => {
  if (args[0] === undefined) {
    message.channel.send(
      "Onii chan please state what you want to search, use -help safebooru for more details"
    );
  } else {
    message.channel.startTyping();
    const query = args[0];
    booru
      .search("safebooru", [query], { nsfw: false, limit: 1, random: true })
      .then(images => {
        //console.log(images);
        for (let image of images) {
          return message.channel.send(`${message.member.user.username} has discovered a new ${args[0]} image from safebooru`,{
            files: [image.fileUrl]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    message.channel.stopTyping();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sb"],
  permLevel: "User"
};

exports.help = {
  name: "safebooru",
  category: "Images",
  description: "Random image from safebooru",
  usage: "<prefix>safebooru <search term>",
  option: ""
};
