const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args, level) => {
  if (!args[0]) {
    let helpEmbed1 = new MessageEmbed()
      .setAuthor("-« Command List »-", "https://i.imgur.com/AOu20zt.gif")
      .setDescription(
        `onii chan use ${client.config.settings.prefix}help <command> for more details`
      )
      .setColor("#7EB9FF")
      .addField("• Prefix", `${client.config.settings.prefix}`, true)
      .addField("• Chat", `<@${client.user.id}>`, true)
      .addField("• Version", "v0.0.1", true)
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
        "• Images-Manipulation",
        "autocrop **|** blurpify **|** changemymind **|** ddlc **|** deepfry **|** faketweet **|** kannagen **|** magic **|** phcomment **|** " +
          "rainbow **|** superreso **|** threats",
        false
      )
      .addField(
        "• Music",
        "play **|** playlink **|** playlist **|** pause **|** skip **|** skipto **|** stop **|** pause **|** resume **|** volume **|** queue **|** " +
          "shuffle **|** nowplaying **|** loop **|** lyrics **|** remove **|** leave **|** move ",
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
        "github **|** botinfo **|** hexcolor **|** math **|** mylevel **|** passwordstrength **|** ping **|** poll **|** reminder **|** " +
          "serverinfo **|** stats **|** translate **|** urbandictionary **|** userinfo **|** wikipedia **|** base64 **|** corona **|** emojiimage **|** " +
          "texttospeech **|** soundboard ",
        false
      )
      .addField(
        "• Moderation",
        "addrole **|** ban **|** conf **|** eval **|** execute **|** kick **|** mute **|** purge **|** reboot **|** reload **|** removerole **|** " +
          "say **|** set **|** shutdown **|** unmute **|** warn",
        false
      );

    message.channel.send(helpEmbed1);
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
          "https://i.imgur.com/fmPtIuK.png"
        )
        .addField("• Description", `${command.help.description.toLowerCase()}`)
        .addField("• Usage", `${command.help.usage}`);
      if (command.conf.aliases.join(", ")) {
        helpEmbed2.addField("• Aliases", `${command.conf.aliases.join(", ")}`);
      }
      if (command.help.option) {
        helpEmbed2.addField("• Option", `${command.help.option}`);
      }
      helpEmbed2.addField(
        "• Permission",
        `${command.conf.permLevel.toLowerCase()}`
      );
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
