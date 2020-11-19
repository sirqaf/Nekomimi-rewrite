const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  var choices = ["heads", "tails"];

  try {
    var output = choices[Math.floor(Math.random() * choices.length)];

    if (args[0] === "heads" || args[0] === "tails"){
    const embed = new Discord.MessageEmbed()
      .setColor("#7EB9FF")
      .setDescription(`It landed on ${output}`);
      message.channel.send(embed);
      if (output === args[0]){
          message.channel.send("Onii chan sugoii!")
      } else {
          message.channel.send("It`s okay onii chan, you can try again")
      }
    } else {
        message.channel.send("Onii chan you must input a choices, see -help flipcoin for more details")
    }
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with flipcoin command");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["fc"],
  permLevel: "User",
};

exports.help = {
  name: "flipcoin",
  category: "Fun",
  description: "Flip the coin",
  usage: "<prefix>flipcoin <option>",
  option: "heads/tails",
};
