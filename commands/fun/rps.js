let choices = ["rock", "paper", "scissors"];
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0])
      return message.reply("You need to input rock, paper, or scissors!");

    if (!choices.includes(args[0]))
      return message.reply("You need to choose rock, paper, or scissors!");

    let urps = args[0];
    let brps = choices.random();
    let low;

    if (urps == brps) low = "Onii chan its a tie!";

    if (urps == "rock" && brps == "paper" && !low) low = "Onii chan i Win!";
    if (urps == "scissors" && brps == "rock" && !low) low = "Onii chan i Win!";
    if (urps == "paper" && brps == "rock" && !low) low = "Onii chan you Win!";
    if (urps == "rock" && brps == "scissors" && !low) low = "Onii chan you Win!";
    if (urps == "paper" && brps == "scissors" && !low) low = "Onii chan i Win!";
    if (urps == "scissors" && brps == "paper" && !low) low = "Onii chan you Win!";

    const embed = new Discord.MessageEmbed()
      .setTitle(low)
      .setDescription("I choose " + brps + "\nAnd you choose " + urps)
      .setColor("#7EB9FF");

    message.channel.send(embed);
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem the rps command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "rps",
  category: "Etc",
  description: "Rps with kawaii imouto",
  usage: "<prefix>rps <rock, paper, scissors>",
  option: ""
};
