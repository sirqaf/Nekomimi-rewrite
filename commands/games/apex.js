const Discord = require("discord.js");
const axios = require("axios");
const apiKey = process.env.APEX_API_KEY;

const getApexData = async (url) =>
  await axios
    .get(url, {
      headers: {
        "TRN-Api-Key": apiKey,
        Accept: "application/json",
        "Accept-Encoding": "gzip",
      },
    })
    .then((response) => {
      return response.data;
    });

exports.run = async (message, args) => {
  let url = `https://public-api.tracker.gg/apex/v1/standard/profile/5/${args}`;
  if (!args.length) return;
  await getApexData(url)
    .then((data) => {
      const platformData = data.data.platformInfo;
      const metaData = data.data.metadata;
      const generalData0 = data.data.segments[0];
      const generalData1 = data.data.segments[1];
      const rank = data.data.segments[0].stats.rankScore;

      console.log(data);
      if (
        "headshots" in generalData1.stats &&
        generalData0.stats.level.displayValue < 500
      ) {
        const embed1 = new Discord.MessageEmbed()
          .setColor("#7EB9FF")
          .setThumbnail(`${platformData.avatarUrl}`)
          .setAuthor(`${platformData.platformUserId}`)
          .addField(`▬▬▬▬▬▬▬▬▬▬▬`, `\u200b`)
          .addField(`• Level`, `${generalData0.stats.level.displayValue}`, true)
          .addField(`• Legends`, `${metaData.activeLegendName}`, true)
          .addField(`• Kills`, `${generalData1.stats.kills.displayValue}`, true)
          .addField(
            `• Headshots`,
            `${generalData1.stats.headshots.displayValue}`,
            true
          )
          .addField(`• Rank`, `${rank.metadata.rankName}`, true)
          .addField(`• Point`, `${rank.displayValue}`, true)
          .setImage(`${generalData1.metadata.tallImageUrl}`)
          .setFooter(
            `apex legends`,
            `https://i.imgur.com/MZn5ZXy.png`
          );
        message.channel.send(embed1);
        return;
      } else if (
        "headshots" in generalData1.stats &&
        generalData0.stats.level.displayValue > 500
      ) {
        const embed2 = new Discord.MessageEmbed()
          .setColor("#7EB9FF")
          .setThumbnail(`${platformData.avatarUrl}`)
          .setAuthor(`${platformData.platformUserId}`)
          .addField(`▬▬▬▬▬▬▬▬▬▬▬`, `\u200b`)
          .addField(`• Level`, `500`, true)
          .addField(`• Legends`, `${metaData.activeLegendName}`, true)
          .addField(`• Kills`, `${generalData1.stats.kills.displayValue}`, true)
          .addField(
            `• Headshots`,
            `${generalData1.stats.headshots.displayValue}`,
            true
          )
          .addField(`• Rank`, `${rank.metadata.rankName}`, true)
          .addField(`• Point`, `${rank.displayValue}`, true)
          .setImage(`${generalData1.metadata.tallImageUrl}`)
          .setFooter(
            `apex legends`,
            `https://i.imgur.com/MZn5ZXy.png`
          );
        message.channel.send(embed2);
        return;
      }
      if (generalData0.stats.level.displayValue < 500) {
        const embed3 = new Discord.MessageEmbed()
          .setColor("#7EB9FF")
          .setThumbnail(`${platformData.avatarUrl}`)
          .setAuthor(`${platformData.platformUserId}`)
          .addField(`▬▬▬▬▬▬▬▬▬▬▬`, `\u200b`)
          .addField(`• Platform`, `${platformData.platformSlug}`, true)
          .addField(`• Level`, `${generalData0.stats.level.displayValue}`, true)
          .addField(`• Legends`, `${metaData.activeLegendName}`, true)
          .addField(`• Kills`, `${generalData1.stats.kills.displayValue}`, true)
          .addField(`• Rank`, `${rank.metadata.rankName}`, true)
          .addField(`• Point`, `${rank.displayValue}`, true)
          .setImage(`${generalData1.metadata.tallImageUrl}`)
          .setFooter(
            `apex legends`,
            `https://i.imgur.com/MZn5ZXy.png`
          );
        message.channel.send(embed3);
        return;
      } else {
        const embed4 = new Discord.MessageEmbed()
          .setColor("#7EB9FF")
          .setThumbnail(`${platformData.avatarUrl}`)
          .setAuthor(`${platformData.platformUserId}`)
          .addField(`▬▬▬▬▬▬▬▬▬▬▬`, `\u200b`)
          .addField(`• Platform`, `${platformData.platformSlug}`, true)
          .addField(`• Level`, `500`, true)

          .addField(`• Legends`, `${metaData.activeLegendName}`, true)
          .addField(`• Kills`, `${generalData1.stats.kills.displayValue}`, true)
          .addField(`• Rank`, `${rank.metadata.rankName}`, true)
          .addField(`• Point`, `${rank.displayValue}`, true)
          .setImage(`${generalData1.metadata.tallImageUrl}`)
          .setFooter(
            `apex legends`,
            `https://i.imgur.com/MZn5ZXy.png`
          );
        message.channel.send(embed4);
        return;
      }
    })
    .catch((response) => {
      console.log(response);
      message.channel.send("Onii chan the username cannot be found");
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "apex",
  category: "Games",
  description: "Check apex legends player stats",
  usage: "<prefix>apex <ign>",
  option: "",
};
