const Discord = require("discord.js");
const Jikan = require("jikan-node");
const mal = new Jikan();
var moment = require("moment");
moment.locale("en-us");

function createDescription(animes) {
  let c = "";
  for (i = 0; i < animes.length && i < 10; i++) {
    let anime = animes[i];
    let title = anime.title;
    let score = anime.score;
    let url = anime.url;
    c += `${i + 1}: **${title}** \n **Rating:** ${score} \n \n`;
  }
  return c;
}

exports.run = (message, args) => {
  animeTitle = args;
  mal
    .search("anime", animeTitle, 1)
    .then((result) => {
      let animes = result.results;
      let filterNumber = [];
      for (i = 0; i < animes.length && i < 10; i++) {
        filterNumber += i.toString();
      }
      const embedSelection = new Discord.MessageEmbed()
        .setTitle("Please Choose")
        .setColor("#7EB9FF")
        .setDescription(createDescription(animes))
        .setTimestamp();
      message.channel
        .send(
          "Onii chan please choose the desired anime by sending the corresponding number",
          embedSelection
        )
        .then((msg) => {
          let i;
          message.channel
            .awaitMessages(
              (response) => {
                for (i = 0; i < filterNumber.length; i++) {
                  if (response.content === filterNumber[i]) {
                    response.delete();
                    return true;
                  }
                }
              },
              {
                max: 1,
                //set timer for deleting search result
                //time: 10000,
                //errors: ["time"]
              }
            )
            .then((collected) => {
              mal.findAnime(animes[i - 1].mal_id).then((result) => {
                console.log(result);
                anime = result;
                const embedAnime = new Discord.MessageEmbed()
                  .setColor("#7EB9FF")
                  .setTitle(anime.title)
                  .addField(
                    "❯ Alternative Titles",
                    `• **English:** ${
                      anime.title_english ? anime.title_english : anime.title
                    }\n• **Synonyms:** ${
                      anime.title_synonyms[0] ? anime.title_synonyms : "`N/A`"
                    }\n• **Japanese:** ${anime.title_japanese}`
                  )
                  .setImage(anime.image_url, true)
                  .setDescription(
                    anime.synopsis
                      ? anime.synopsis.length <= 2048
                        ? anime.synopsis.replace(/<[^>]*>/g, "")
                        : andanotheroutput(
                            anime.synopsis.replace(/<[^>]*>/g, "")
                          )
                      : "`N/A`"
                  )
                  .addField("MAL external link:", anime.url)
                  .addField(
                    "❯ Information",
                    `• **Type:** ${
                      anime.type ? anime.type : "`N/A`"
                    }\n• **Episodes:** ${
                      anime.episodes ? anime.episodes : "`N/A`"
                    }\n• **Status:** ${anime.status}\n• **Aired:** ${
                      anime.aired.string
                    }\n• **Rating:** ${anime.rating ? anime.rating : "`N/A`"}`,
                    true
                  )
                  .addField(
                    "❯ Statistics",
                    `• **Score:** ${
                      anime.score ? anime.score : "`N/A`"
                    }\n• **Ranked:** #${
                      anime.rank ? anime.rank : "`N/A`"
                    }\n• **Popularity:** #${
                      anime.popularity ? anime.popularity : "`N/A`"
                    }\n• **Members:** ${
                      anime.members ? anime.members : "`N/A`"
                    }\n• **Favorites:** ${
                      anime.favorites ? anime.favorites : "`N/A`"
                    }`,
                    true
                  );
                message.channel.send(embedAnime);
                msg.delete();
              });
            });
          /*.catch(collected => {
              message.channel.send("Time is up");
              msg.delete();
            });*/
        });
    })
    .catch((response) => {
      console.log(response);
      message.channel.send("Onii chan im not functioning correctly");
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "anime",
  category: "Anime",
  description: "Search for anime",
  usage: "<prefix>anime <animename>",
  option: "",
};
