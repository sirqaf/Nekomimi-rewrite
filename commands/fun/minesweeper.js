const Minesweeper = require("discord.js-minesweeper");

exports.run = async (client, message, args) => {
  try {
    let minesweeper;
    switch (args[0]) {
      case "beginner":
        minesweeper = new Minesweeper({
          rows: 5,
          columns: 5,
          mines: 4,
          revealFirstCell: true,
          returnType: "emoji"
        });
        break;
      case "amateur":
        minesweeper = new Minesweeper({
          rows: 7,
          columns: 7,
          mines: 6
        });
        break;
      case "pro":
        minesweeper = new Minesweeper({
          rows: 10,
          columns: 10,
          mines: 8
        });
        break;
      case "legendary":
        minesweeper = new Minesweeper({
          rows: 12,
          columns: 12,
          mines: 10
        });
        break;
      default:
        minesweeper = new Minesweeper();
        break;
    }

    message.channel.send(minesweeper.start());
  } catch (err) {
    console.log(err);
    message.channel.send(
      "Onii chan there is a problem with minesweeper command"
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ms"],
  permLevel: "User"
};

exports.help = {
  name: "minesweeper",
  category: "Fun",
  description: "Play minesweeper",
  usage: "<prefix>minesweeper <difficulty/option(optional)>",
  option: "difficulty: beginner, amateur, pro, legendary"
};
