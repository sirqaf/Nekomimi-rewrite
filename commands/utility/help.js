const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args, level) => {
  if (!args[0]) {
    let helpEmbed1 = new MessageEmbed()
      .setAuthor(
        "-« Command List »-",
        "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fcat-help-2.gif?v=1598642077301"
      )
      .setDescription(
        `onii chan use ${process.env.PREFIX}help <command> for more details`
      )
      .setColor("#7EB9FF")
      .addField("• Prefix", `${process.env.PREFIX}`, true)
      .addField("• Chat Prefix", `${process.env.CHAT_PREFIX}`, true)
      .addField("• Version", "v0.0.1-beta", true)
      .addField(
        "• Anime",
        "anime **|** animenocontext **|** character **|** saucenao **|** saucemoe **|** waifu2x",
        false
      )
      .addField(
        "• Images",
        "animewallpaper **|** baka **|** neko **|** cuddle **|** cat **|** feed **|** hug **|** kemonomimi **|** kiss **|** " +
          "loli **|** nekogif **|** pat **|** poke **|** safebooru **|** slap **|** smug **|** tickle **|** gecg **|** ascii" +
          " bite **|** blush **|** bully **|** dance **|** cringe **|** cry **|** lick **|** nom **|** sfw **|** wink **|** shinobu",
        false
      )
      .addField(
        "• Music",
        "play **|** pause **|** skip **|** stop **|** pause **|** resume **|** volume **|** queue **|** clearqueue **|** filter **|** filterstatus **|** " +
          "shuffle **|** nowplaying **|** loop **|** nya **|** forcestop **|** forceskip **|** lyrics **|** remove **|** leave **|** daisuki",
        false
      )
      .addField(
        "• Games",
        "apex **|** apexnews **|** game **|** minecraft",
        false
      )
      .addField(
        "• Fun",
        "8ball **|** punch **|** rps **|** minesweeper **|** snake **|** hangman **|** connect4 **|** tictactoe",
        false
      )
      .addField(
        "• Utility",
        "github **|** autocrop **|** hexcolor **|** math **|** mylevel **|** passwordstrength **|** ping **|** poll **|** reminder **|** " +
          "serverinfo **|** stats **|** translate **|** urbandictionary **|** userinfo **|** wikipedia **|** base64 **|** corona **|** emojiimage **|** faketweet **|** " +
          "magic **|** memegen **|** superreso **|** texttospeech",
        false
      )
      .addField(
        "• Moderation",
        "addrole **|** ban **|** conf **|** eval **|** execute **|** kick **|** mute **|** purge **|** reboot **|** reload **|** removerole **|** " +
          "say **|** set **|** shutdown **|** unmute **|** warn",
        false
      );

    message.channel.send(helpEmbed1).catch(console.error);
    message.channel.send(
      "Onii chan this is all my command, please use me properly"
    );
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      // if (level < client.levelCache[command.conf.permLevel]) return; //check permission then return if invalid
      const helpEmbed2 = new MessageEmbed()
        .setColor("#7EB9FF")
        // as a countermeasure againts discord embed rendered on mobile
        .setAuthor(
          `${command.help.name.toUpperCase()}\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b`,
          "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fneko-paw.png?v=1598350685447"
        )
        .addField("• Description", `${command.help.description.toLowerCase()}`)
        .addField("• Usage", `${command.help.usage}`)
        .addField("• Aliases", `${command.conf.aliases.join(", ")}` || "\u200b")
        .addField("• Permission", `${command.conf.permLevel.toLowerCase()}`)
        .addField("• Option", `${command.help.option}` || "\u200b");
      //.setFooter("nyaa~", "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fneko-paw.png?v=1598350685447");
      message.channel.send(helpEmbed2);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "Utility",
  description: "Display all commands",
  usage: "<prefix>help <command>",
  option: ""
};
