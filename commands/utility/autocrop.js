const jimp = require("jimp");

exports.run = async (client, message, args) => {
  
  try {
      var cropImage = "cropImage.png";
      let image = await jimp.read(args[0]);
      image.autocrop(0.0003, false);
      image.write(cropImage);
      console.log(image);
      message.channel.send({
        files: [cropImage]
      });
    message.channel.send("Onii chan i have cropped the image")
    
    } catch (error) {
      console.error(error);
      return message.channel.send(
        "Onii chan there is a problem with cropping image"
      );
}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "autocrop",
  category: "Utility",
  description: "autocrop images (remove border/frame)",
  usage: "<prefix>autocrop <attachment/image>"
};
