const Discord = require("discord.js");
const request = require("request");
const util = require("util");
var get = util.promisify(request.get);
var post = util.promisify(request.post);

exports.run = (client, message, args, level) => {

  function getTime(secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600) % 24;
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    return [hours, minutes, seconds]
      .map(v => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  }

  const urlRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
  var MessageAttachment = message.attachments.first();
  var match = message.content.match(urlRegex);
  const url = (MessageAttachment && MessageAttachment.url) || (match && match[0]);

  if (url != null) {
    getImage();
  } else {
    message.channel.send(
      "Onii chan you must upload a picture while using this command, either .png or .jpeg"
    );
  }

  async function getImage() {
    const { body: imageBuffer } = await get(url, { encoding: null });
    const { body: result } = await post(`https://trace.moe/api/search?`, {
      json: true,
      formData: {
        image: `data:image/jpeg;base64,${imageBuffer.toString("base64")}`
      }
    });
    if (!result.docs) {
      message.channel.send(
        "Onii chan either no results were found, the image isn't a full frame image, or an error occured."
      );
    }

    const embed = new Discord.MessageEmbed()
      .addField(
        "MAL Link:",
        `https://myanimelist.net/anime/${
          result.docs[0].mal_id
        }/${result.docs[0].title_romaji.split(" ").join("_")}`
      )
      .setColor("#7EB9FF")
      .addField("Japanese Title", result.docs[0].title)
      .addField("Romaji Title", result.docs[0].title_romaji)
      .addField("English Title", result.docs[0].title_english)
      .setImage(
        `https://trace.moe/thumbnail.php?anilist_id=${
          result.docs[0].anilist_id
        }&file=${encodeURIComponent(result.docs[0].filename)}&t=${
          result.docs[0].at
        }&token=${result.docs[0].tokenthumb}`
      )
      .setFooter(
        `Season start ${result.docs[0].season}, Episode ${
          result.docs[0].episode
        } at ${getTime(result.docs[0].at)}`
      );

    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "saucemoe",
  category: "Anime",
  description: "Search for anime scene source only",
  usage: "<prefix>sauce <Attachment>",
  option: ""
};
