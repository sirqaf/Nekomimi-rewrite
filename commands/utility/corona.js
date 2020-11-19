const Discord = require("discord.js");
const axios = require("axios");

const get_virus_statistic = async url =>
  await axios.get(url).then(response => {
    return response.data;
  });

const embeded = ({ cases, deaths, recovered }) =>
  new Discord.MessageEmbed()
    .setThumbnail(
      "https://cdn.glitch.com/9fe2d21c-0863-4ed3-b866-17b3da405aca%2Fcorona.png?v=1596530227076"
    )
    .setColor("#7EB9FF")
    .setTitle("Covid-19 Stats")
    .addField("**:mask:**   Cases", `${cases.toLocaleString("en")}`,)
    .addField("**:skull:**   Deaths", `${deaths.toLocaleString("en")}`,)
    .addField(
      "**:white_check_mark:**   Recovered",
      `${recovered.toLocaleString("en")}`,
    )
    .setFooter(
      "corona chan"
    );

exports.run = async (client, message, args, level) => {
  const url = `https://corona.lmao.ninja/v2/${
    !args.length ? "all" : "countries/" + args
  }`;
  await get_virus_statistic(url)
    .then(infectionData => {
      message.channel.send({ embed: embeded(infectionData) });
    })
    .catch(response => {
      console.log(response);
      message.channel.send("Onii chan corona chan is not available right now");
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "corona",
  category: "Utility",
  description: "Check corona virus stats",
  usage: "<prefix>corona <country(optional)/option>",
  option: "my, sg, us, fr, th, id, ch, in"
};
