const zxcvbn = require("zxcvbn");

exports.run = async (client, message, args, level) => { 
  try {
    if (message.guild) return message.channel.send("Onii chan are you baka, you want to show your password on everyone huh. Please run this command in DM`s");
    if (!args[0]) return message.reply("Onii chan you need to give the password!");
    
    let res = await zxcvbn(args.join(" "));
    let scorefr = "";
    
    if (res.score == 0) scorefr = "Very Weak";
    if (res.score == 1) scorefr = "Weak";
    if (res.score == 2) scorefr = "Medium";
    if (res.score == 3) scorefr = "Strong";
    if (res.score == 4) scorefr = "Very Strong";
    
    let embed = new client.MessageEmbed("normal", {
      title: "Password Strength",
      fields: [
        {
          title: "Score",
          text: res.score + " - " +  scorefr
        },
        {
          title: "Throttled Online Attack Crack Time",
          text: res.crack_times_display.online_throttling_100_per_hour.toProperCase() || "Not Available"
        },
        {
          title: "Unthrottled Online Attack Crack Time",
          text: res.crack_times_display.online_no_throttling_10_per_second.toProperCase() || "Not Available"
        },
        {
          title: "Offline attack, Slow hash, Many cores Crack Time",
          text: res.crack_times_display.offline_slow_hashing_1e4_per_second.toProperCase() || "Not Available"
        },
        {
          title: "Offline attack, Fast hash, Many cores Crack Time",
          text: res.crack_times_display.offline_fast_hashing_1e10_per_second.toProperCase() || "Not Available"
        }
      ]
    });
    
    message.channel.send(embed);
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with passwordstrength command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ps"],
  permLevel: "User"
};

exports.help = {
  name: "passwordstrength",
  category: "Utility",
  description: "Show how long your password will take to crack and the strength of it",
  usage: "<prefix>passwordstrength <password>",
  option: ""
};
