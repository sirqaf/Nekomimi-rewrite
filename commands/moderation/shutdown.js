// bot will be off while the project still active in glitch server
// implement this curl -X POST https://api.glitch.com/projects/{project-id}/stop?authorization={user-token} to shut down server

exports.run = async (client, message, args, level) => { 

  try {
    let res = await client.awaitReply(message, "Onii chan are you sure you want to turn me off? (yes/no)");
    
    if (res == "yes") {
      await message.channel.send("Sayonara onii chan, nekomimi will always be with you");
      await message.channel.send("Shutting down..");
      client.destroy();
    }
    else message.channel.send("Onii chan shut down has been cancel");
  } catch (err) {
    console.log(err);
    message.channel.send("Onii chan there is a problem with shutdown command");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "shutdown",
  category: "Moderation",
  description: "Shutting down nekomimi",
  usage: "<prefix>shutdown",
  option: ""
};
