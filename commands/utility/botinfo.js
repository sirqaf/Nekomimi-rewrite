
const Discord = require("discord.js")

exports.run = async (client, message, args, level) => {
    try {
        let embed = new Discord.MessageEmbed()
        .setColor("#7EB9FF")
        .setTitle("Bot Information")
        .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .addField("• Name", `${message.guild.me.displayName}`, true)
        .addField("• Creator", `sirqaf#8433`, true)
        .addField(`• Source Code`,'https://github.com/sirqaf/Nekomimi', true)
        .addField("• Created on", `${client.user.createdAt}`)
        message.channel.send(embed);
    } catch (err) {
      console.log(err);
      message.channel.send("Onii chan there is a problem with botinfo command");
    }
  };
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "botinfo",
    category: "Utility",
    description: "View bot information",
    usage: "<prefix>botinfo",
    option: ""
  }