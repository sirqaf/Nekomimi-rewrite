exports.run = async (client, message, args, level) => {
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 2 || deleteCount > 150)
    return message.reply(
      "Onii chan please provide a number between 2 and 150 for the number of messages to delete"
    );
  // await message.channel.messages
  //   .fetch({
  //     limit: 2
  //   })
  //   .then(messages => {
  //     messages = messages
  //       .filter(m => m.author.id === m.member.user.id)
  //       .array();
  //     message.channel
  //       .bulkDelete(messages)
  //       .catch(error => console.log(error.stack));
  //   });
  const fetched = await message.channel.messages.fetch({
    limit: deleteCount
  });
  message.channel
    .bulkDelete(fetched)
    .catch(error =>
      message.reply(
        `Gomenasai onii chan, I couldn't delete messages because of: ${error}`
      )
    );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Clear user message in channel",
  usage: "<prefix>purge <value/option>",
  option: "2-150"
};
