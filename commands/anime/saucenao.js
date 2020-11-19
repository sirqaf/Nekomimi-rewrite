const Discord = require("discord.js");
const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
  if (!args[0]) {
    var Attachment = message.attachments.array();
    if (Attachment[0] == null) {
      message.channel.send(
        "Onii chan please input an image/url or i will sauce you"
      );
    } else {
      //console.log(Attachment)
      Attachment.forEach(function(attachment) {
        var link = attachment.url;
        console.log(link);
        getSauce(link);
      });
    }
    // } else if (args[1] === "crop" || "Crop") {
    //   // Crop image border url
    //   // try {
    //   var cropImage = "cropImage.png";
    //   let image = await jimp.read(args[0]);
    //   image.autocrop(0.0003, false);
    //   image.write(cropImage);
    //   console.log(image);
    //   message.channel.send("crop", {
    //     files: [cropImage]
    //   });
    //   console.log(cropImage.url)
    // message.attachments.forEach(function(attachment) {
    //   console.log(attachment.url);
    // });
    // var link = cropImage;
    // console.log(link);
    // getSauce(link);
    // } catch (error) {
    //   console.error(error);
    //   return message.channel.send(
    //     "Onii chan there is a problem with cropping image"
    //   );
    // }
  } else {
    // Direct url
    var link = args[0];
    console.log(link);
    getSauce(link);
  }
  function getSauce(link) {
    try {
      fetch(
        "https://saucenao.com/search.php?output_type=2&url=" +
          link +
          "&api_key=" +
          process.env.SAUCENAO_API_KEY
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(jsonObj) {
          var c = 0;
          var results = jsonObj.results;
          for (var call of results) {
            //console.log(call)
            var data = call.header;
            var similarity = data.similarity;
            var thumbnail = data.thumbnail;
            var index_name = data.index_name;
            var mainValue = call.data;
            var source = mainValue.source;
            var year = mainValue.year;
            var pixiv_id = mainValue.pixiv_id; //on pixiv
            var member_name = mainValue.member_name;
            var title = mainValue.title; //of pixiv
            var danbooru_id = mainValue.danbooru_id;
            var material = mainValue.material; //on danbooru
            var character = mainValue.characters; //on danbooru
            var aniDb_id = mainValue.anidb_aid;
            var part = mainValue.part;
            var est_time = mainValue.est_time;
            var drawr_id = mainValue.drawr_id; //on drawr
            var da_id = mainValue.da_id; //Deviant Art
            var author_name = mainValue.author_name; //Deviant art Author Name
            var author_url = mainValue.author_url; // Deviantart Author URL
            var creator = mainValue.creator; //creator on booru site
            var percentage = parseFloat(similarity);

            if (percentage <= 50) {
              if (c != 0) {
                message.channel.send(
                  "Onii chan i found the sauce, pwease pat me („• ֊ •„)"
                );
                console.log("Sauce Found");
              } else {
                message.channel.send("Onii chan no sauce can be found");
              }
              break;
            }
            var url = mainValue.ext_urls;
            console.log(
              "similarity:",
              similarity,
              "source:",
              source,
              "year:",
              year,
              "index-name:",
              index_name,
              "External Url:",
              url
            );

            const embed = new Discord.MessageEmbed()
              .setColor("#7EB9FF")
              .setImage(thumbnail)
              .addField(`Sauce Similarity: ${similarity}%`, "\u200b");
            if (title != undefined) {
              embed.addField("Title:", title, true);
            }
            if (source != undefined && source != "") {
              embed.addField("Source", source, true);
            }
            if (creator != undefined && creator != "") {
              embed.addField("Creator", creator, true);
            }
            if (pixiv_id != undefined && pixiv_id != "") {
              embed.addField("Pixiv ID", pixiv_id, true);
            }
            if (member_name != undefined && member_name != "") {
              embed.addField("Member Name", member_name, true);
            }
            if (drawr_id != undefined && drawr_id != "") {
              embed.addField("Drawr ID", drawr_id, true);
            }
            if (da_id != undefined && da_id != "") {
              embed.addField("Deviantart ID", da_id, true);
            }
            if (author_name != undefined && author_name != "") {
              embed.addField("Author Name", author_name, true);
            }
            if (author_url != undefined && author_url != "") {
              embed.addField("Author url", author_url, true);
            }
            if (danbooru_id != undefined && danbooru_id != "") {
              embed.addField("Danbooru ID:", danbooru_id, true);
            }
            if (material != undefined && material != "") {
              embed.addField("Material:", material, true);
            }
            if (character != undefined && character != "") {
              embed.addField("Character:", character, true);
            }
            if (aniDb_id != undefined && aniDb_id != "") {
              embed.addField("AniDB ID", aniDb_id, true);
            }
            if (year != undefined && year != "") {
              embed.addField("Year", year, true);
            }
            if (part != undefined && part != "") {
              embed.addField("Part", part, true);
            }
            if (est_time != undefined && est_time != "") {
              embed.addField("Estimated Time", est_time, true);
            }
            if (index_name != undefined && index_name != "") {
              embed.addField("Index", index_name, true);
            }
            if (url != undefined && url != "") {
              embed.addField("Link", url, true);
            }

            message.channel.send({ embed: embed });

            c = c + 1;
          }
        });
    } catch (error) {
      message.channel.send("Onii chan please insert a valid image/url");
      console.log(error);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "saucenao",
  category: "Anime",
  description: "Search for anime and art source",
  usage: "<prefix>sauce <Attachment/link>",
  option: ""
};
