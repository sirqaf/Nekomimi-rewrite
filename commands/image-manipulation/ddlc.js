const fetch = require("node-fetch");

exports.run = (client, message, args) => {
  var backgrounds = [
    "bedroom",
    "class",
    "closet",
    "club",
    "corridor",
    "house",
    "kitchen",
    "residential",
    "sayori_bedroom"
  ];
  if (args[0] === "monika" || "sayori" || "yuri" || "natsuki") {
    if (args[0] === "monika") {
      var faces = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r"
      ];
      var bodies = ["1", "2"];
    } else if (args[0] === "sayori") {
      var faces = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y"
      ];
      var bodies = ["1", "1b", "2", "2b"];
    } else if (args[0] === "yuri") {
      var faces = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x"
      ];
      var bodies = ["1", "1b", "2", "2b"];
    } else if (args[0] === "natsuki") {
      var faces = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      var bodies = ["1", "1b", "2", "2b"];
    }
  } else {
    message.channel.send(
      `Onii chan please select DDLC character, see ${client.config.settings.prefix}help ddlc for details`
    );
  }
  var face = faces[Math.floor(Math.random() * faces.length)];
  var body = bodies[Math.floor(Math.random() * bodies.length)];
  var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  if (!args[1]) {
    message.channel.send("Onii chan please input some text");
  } else {
    var text = args.join(" ").replace(args[0] + " ", "");
    ddlc(text);
  }

  async function ddlc(text) {
    message.channel.startTyping();
    try {
      const data = await fetch(
        `https://nekobot.xyz/api/imagegen?type=ddlc&character=${
          args[0]
        }&background=${background}&body=${body}&face=${face}&text=` +
          encodeURIComponent(text)
      );
      const result = await data.json();

      if (result.status === 200) {
        message.channel.send({
          files: [result.message]
        });
        console.log(result);
      } else {
        message.channel.send("Onii chan there is a problem with API");
      }
    } catch (error) {
      message.channel.send("Onii chan please insert a valid text");
      console.log(error);
    }
    message.channel.stopTyping();
    message.delete();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  cooldown: 10,
  permLevel: "User"
};

exports.help = {
  name: "ddlc",
  category: "Image-manipulation",
  description: "Generate text into random doki doki literature club image",
  usage: "<prefix>ddlc <character> <text>",
  option: "character: monika/sayori/yuri/natsuki"
};
