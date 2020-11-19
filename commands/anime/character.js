const Discord = require("discord.js");
const Jikan = require("jikan-node");
const mal = new Jikan();

function createDescription(characters) {
  let c = "";
  for (i = 0; i < characters.length && i < 10; i++) {
    let character = characters[i];
    let name = character.name;
    let anime = character.anime;
    let manga = character.manga;
    let animeName = "";
    let mangaName = "";
    if (typeof anime !== "undefined" && anime.length > 0) {
      animeName = anime[0].name;
      c += `${i + 1}: **${name}** \n ${animeName} \n \n`;
    } else if (typeof manga !== "undefined" && manga.length > 0) {
      mangaName = manga[0].name;
      c += `${i + 1}: **${name}** \n ${mangaName} \n \n`;
    }
  }
  return c;
}

exports.run = (client, message, args, level) => {
  
  name = message.author.username;
  characterName = args;
  mal
    .search("character", characterName, 1)
    .then(result => {
      characters = result.results;
      let filterNumber = [];
      for (i = 0; i < characters.length && i < 10; i++) {
        filterNumber += i.toString();
        console.log(filterNumber);
      }
      for (i = 0; i < characters.length; i++) {
        characters[i].anime.sort((a, b) =>
          a.mal_id > b.mal_id ? 1 : b.mal_id > a.mal_id ? -1 : 0
        );
      }
      const embedSelection = new Discord.MessageEmbed()
        .setTitle("Results")
        .setColor("#7EB9FF")
        .setDescription(createDescription(characters));
      //.setTimestamp();
      // message.channel.send(, embedSelection);
      message.channel
        .send(
          "Onii chan please choose the corresponding number",
          embedSelection
        )
        .then(msg => {
          let i;
          message.channel
            .awaitMessages(
              response => {
                for (i = 0; i < filterNumber.length; i++) {
                  if (response.content === filterNumber[i]) {
                    response.delete();
                    return true;
                  }
                }
              },
              {
                max: 1,
                time: 10000,
                errors: ["time"]
              }
            )
            .then(collected => {
              mal.findCharacter(characters[i - 1].mal_id, "").then(result => {
                character = result;
                console.log(character.voice_actors);
                const embedCharacter = new Discord.MessageEmbed()
                  .setColor("#7EB9FF")
                  .setTitle(character.name ? character.name : "")
                  .setColor("BLUE")
                  .setImage(character.image_url)
                  .setDescription(
                    character.nicknames[0] ? character.nicknames[0] : ""
                  )
                  .addField("MAL Link", character.url)
                  .addField(
                    "Anime",
                    character.animeography[0]
                      .name /*+ "\n"
                    character.animeography[0].url,*/
                  )
                  .addField("Voice actor", character.voice_actors[0].name)
                  .setURL(character.animeography[0].url);
                //.setTimestamp();
                message.channel.send(embedCharacter);
                msg.delete();
              });
            })
            .catch(collected => {
              message.channel.send("Onii chan time is over");
              msg.delete();
            });
        });
    })
    .catch(response => {
      console.log(response);
      message.channel.send(
        `Onii chan i didnt find any character called ${characterName}`
      );
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "character",
  category: "Anime",
  description: "Search for anime character",
  usage: "<prefix>character <animecharactername>",
  option: ""
};
