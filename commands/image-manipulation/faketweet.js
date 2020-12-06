const fetch = require("node-fetch");

exports.run = async (client, message, args, level) => {
  let user = args[0];
  let text = args.slice(1).join(" ") || undefined;
  if (!user)
    return message.channel.send(
      "Onii chan you must provide a Twitter username to have as the author of the tweet."
    );
  if (user.startsWith("@")) user = args[0].slice(1);
  const u = user.startsWith("@") ? user.slice(1) : user;
  if (!text)
    return message.channel.send(
      "Onii chan please provide something for me to faketweet."
    );
  message.channel.startTyping();
  fetch(
    `https://nekobot.xyz/api/imagegen?type=tweet&username=${u}&text=${encodeURIComponent(
      text
    )}`
  )
    // API error not func
    .then(res => res.json())
    .then(data => message.channel.send({ files: [data.message] }))
    .catch(err => {
      console.log(err);
      message.channel.stopTyping();
      return message.channel.send(
        "Onii chan there is a problem with the API",
        message
      );
    });
  message.channel.stopTyping();
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  cooldown: 10,
  permLevel: "User"
};

exports.help = {
  name: "faketweet",
  category: "Utility",
  description: "Creates a fake tweet",
  usage: "<prefix>faketweet <username> <message>",
  option: ""
};
