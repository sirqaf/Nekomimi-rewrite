const axios = require("axios").default;

exports.run = async (client, message, args) => {
  if (args) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const text = args;
      const textArg = text.join(" ");
      const audio = await tts(textArg);
      const dispatcher = connection.play(audio, { highWaterMark: 50 });

      dispatcher.on("finish", () => {
        connection.disconnect();
      });

      dispatcher.on("error", () => {
        connection.disconnect();
      });
    } else {
      message.channel.send("Onii chan you are not in a voice channel");
    }
  } else {
    message.channel.send(
      `Onii chan please input text to convert to speech, see ${client.config.settings.prefix} help texttospeech for details`
    );
  }
  async function tts(textArg) {
    let audio = undefined;
    await axios({
      method: "post",
      url: "https://streamlabs.com/polly/speak",
      data: {
        service: "Polly",
        text: textArg,
        voice: "Ivy",
      },
    }).then((response) => {
      audio = response.data.speak_url;
    });
    return audio;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tts"],
  permLevel: "User",
};

exports.help = {
  name: "texttospeech",
  category: "Utility",
  description: "Convert text to speech",
  usage: "<prefix>texttospeech <text>",
  option: "",
};
