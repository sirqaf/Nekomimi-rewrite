const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (client, message, args, level) => {
  axios
    .get(`https://api.mcsrvstat.us/1/${process.env.MC_SERVER_HOST}`)
    .then(res => {
      // If we got a valid response
      const data = res.data;
      const plugins = data.plugins ? data.plugins.names : [];
      const mods = data.mods ? data.mods.names : [];
      if (data.players.list != undefined) {
        let playerCount = res.data.players.online || 0; // Default to zero
        const embed = new Discord.MessageEmbed()
          .setColor("#7EB9FF")
          .setThumbnail(
            `https://cdn.glitch.com/a154c928-09a6-47a7-9ba2-c79cc6bb30d4%2FPicture1.png?v=1592938523080`
          )
          .setAuthor(
            `${process.env.MC_SERVER_HOST}` //`https://api.mcsrvstat.us/icon/iseikai.aternos.me`
          )
          .setDescription(data.motd.clean)
          .addField(
            "**Server**",
            `Status: :green_circle: Online\nIP: ${data.ip}\nPort: ${
              data.port
            }\nSoftware: ${data.software || "Vanilla"}\nVersion: ${
              data.version
            }\nMap: ${data.map || "None"}\nPlugins: ${plugins
              .slice(0, 10)
              .join(" | ") || "None"}${
              plugins.length > 10 ? `And ${plugins.length - 10} more...` : ""
            }\nMods: ${mods.slice(0, 10).join(" | ") || "None"}${
              mods.length > 10 ? `And ${mods.length - 10} more...` : ""
            }`
          )
          .addField(
            "**Player**",
            `Slot Fill: ${data.players.online}/${
              data.players.max
            }\nOnline List: ${data.players.list.slice(0, 10).join(" | ") ||
              "None"}${
              data.players.list.length > 10
                ? `And ${data.players.list.length - 10} more...`
                : ""
            }`
          );

        message.channel.send(embed);
        console.log("Updated player count to", playerCount);
        return;
      } else message.channel.send("Onii chan server is currently offline");
      message.channel.send(
        "Server shut down at 4.00am everyday to avoid being ban"
      );
      message.channel.send("Please turn it back on https://aternos.org");
    Puppeteer.start_server();
      console.log(
        "Could not load player count data for",
        process.env.MC_SERVER_HOST
      );
    })
    .catch(err => console.log("Onii chan there is an error pinging api.mcsrvstat.us for data:", err));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "minecraft",
  category: "Games",
  description: "Check minecraft server",
  usage: "<prefix>minecraft",
  option: ""
};
