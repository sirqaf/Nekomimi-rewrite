module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      member.send("Onii chan you need to join the voice channel").catch(console.error);
      return false;
    }

    return true;
  }
};