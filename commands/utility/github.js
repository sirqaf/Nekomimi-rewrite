const Discord = require("discord.js");
const request = require("request");

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0])
      return message.channel.send(
        "Onii chan you need to give me something to search for!"
      );

    request(
      {
        url:
          "https://api.github.com/search/repositories?q=" +
          encodeURIComponent(args.join(" ")),
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: "token " + process.env.GITHUB_TOKEN,
          "User-Agent": "Nekomimi",
        },
        json: true,
      },
      async (req, res, json) => {
        let output = "";
        let i = 1;

        if (!json.items[0])
          return message.channel.send("Onii chan i couldn't find any results!");
        if (json.items.length > 9) json.items.length = 9;

        json.items.forEach((repo) => {
          let title = repo.name;
          output += "\n" + i + " - " + title;
          i++;
        });
        const embedmenu = new Discord.MessageEmbed()
          .setTitle("Github Repository")
          .setColor("#7EB9FF")
          .setDescription(`${output}`);
        message.channel.send(embedmenu);
        let reponum = await client.awaitReply(
          message,
          `Onii chan please choose the repository you want`
        );
        if (isNaN(reponum))
          return message.channel.send("Onii chan that's not a number!");

        let repo = json.items[reponum - 1];

        request(
          {
            url: repo.url,
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: "token " + process.env.GITHUB_TOKEN,
              "User-Agent": "Nekomimi",
            },
            json: true,
          },
          (req, res, json) => {
            const embed = new Discord.MessageEmbed()
              .setTitle(json.full_name)
              .setColor("#7EB9FF")
              .setURL(json.html_url)
              .setDescription(json.description)
              .setThumbnail(json.owner.avatar_url)
              .addField("Homepage", json.homepage || "none", true)
              .addField("User", json.owner.login, true)
              .addField("Profile", json.owner.html_url, true)
              .addField("Language", json.language || "not specified", true)
              .addField(
                "License",
                json.license ? json.license.name : "no license",
                true
              )
              .addField(
                "Open Issues",
                json.open_issues_count || "no issues found",
                true
              );
            message.channel.send(embed).catch(console.error);
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with github command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "github",
  category: "Utility",
  description: "Search GitHub repositories",
  usage: "<prefix>github <repositories>",
  option: "",
};
