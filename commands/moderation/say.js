exports.run = async (client, message, args, level) => {
try{
  const sayMessage = args.join(" ");
  if (message.mentions.channels.size == 0) {
    message.reply("Onii chan, please mention a channel first.");
  } else {
    let targetChannel = message.mentions.channels.first();
    targetChannel.send(sayMessage);
  }
}catch(err){
  console.log(err);
  message.channel.send("Onii chan there is a problem with say command")
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "say",
  category: "Moderation",
  description: "Say something sneaky",
  usage: "<prefix>say <mentionchannel> <string>",
  option: ""
};
