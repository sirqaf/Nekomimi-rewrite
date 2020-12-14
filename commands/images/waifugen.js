const waifulabs = require("waifulabs");

exports.run = (client, message, args) => {
  //console.log(waifus);
  waifugen();

  async function waifugen() {
    message.channel.startTyping();
    const waifus = await waifulabs.generateWaifus();
    const waifu = waifus[0];
    const imageData = waifu.image;
    const imageSeeds = waifu.seeds;
    const image = Buffer.from(imageData, "base64");
    message.channel.send(
      `${message.member.user.username} generates new waifu`,
      {
        files: [image]
      }
    );
    //console.log(imageSeeds)
    message.channel.stopTyping();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  cooldown: 5,
  permLevel: "User"
};

exports.help = {
  name: "waifugen",
  category: "Images",
  description: "Generate random anime girls images using AI",
  usage: "<prefix>waifugen",
  option: ""
};
