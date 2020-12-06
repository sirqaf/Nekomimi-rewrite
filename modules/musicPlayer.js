const Discord = require("discord.js");
const ytdl = require("erit-ytdl");
const scdl = require("soundcloud-downloader").default;
const { canModifyQueue } = require("../modules/musicModifyQueue");

module.exports = {
  async musicPlayer(song, message) {
    const { SOUNDCLOUD_CLIENT_ID } = process.env.SOUNDCLOUD_CLIENT_ID;
    const queue = message.client.queue.get(message.guild.id);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      return queue.textChannel.send("queue ended");
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

    try {
      if (song.url.includes("youtube.com")) {
        stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
      } else if (song.url.includes("soundcloud.com")) {
        try {
          stream = await scdl.downloadFormat(
            song.url,
            scdl.FORMATS.OPUS,
            SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined
          );
        } catch (error) {
          stream = await scdl.downloadFormat(
            song.url,
            scdl.FORMATS.MP3,
            SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined
          );
          streamType = "unknown";
        }
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.musicPlayer(queue.songs[0], message);
      }

      console.error(error);
      return message.channel.send(
        `Error: ${error.message ? error.message : error}`
      );
    }

    queue.connection.on("disconnect", () =>
      message.client.queue.delete(message.guild.id)
    );

    const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();

        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.musicPlayer(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.musicPlayer(queue.songs[0], message);
        }
      })
      .on("error", err => {
        console.error(err);
        queue.songs.shift();
        module.exports.musicPlayer(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);

    const playerEmbed = new Discord.MessageEmbed()
      .setAuthor(
        "Now Playing",
        "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fplay.png?v=1598773025944"
      )
      .setColor("#7EB9FF")
      .setImage(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
      .addField("• Title", song.title)
      .addField(
        "• Duration",
        Math.floor(song.duration / 60) +
          ":" +
          ("0" + Math.floor(song.duration % 60)).slice(-2)
      );

    try {
      var playingMessage = await queue.textChannel.send(playerEmbed);
      await playingMessage.react("⏯️");
      await playingMessage.react("⏭️");
      await playingMessage.react("🔀");
      await playingMessage.react("🔁");
      await playingMessage.react("⏹️");
      // await playingMessage.react("🔇");
      await playingMessage.react("🔉");
      await playingMessage.react("🔊");
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);

      switch (reaction.emoji.name) {
        case "⏭️":
          queue.playing = true;
          reaction.users.remove(user);
          if (!canModifyQueue(member)) return;
          queue.connection.dispatcher.end();
          const skipEmbed = new Discord.MessageEmbed()
            .setAuthor("Skip", "https://i.imgur.com/dqPRC1O.png")
            .setColor("#7EB9FF")
            .setDescription(`${song.title}`)
            .setThumbnail(
              `https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`
            )
            .setFooter(`user: ${user.username}`);
          queue.textChannel.send(skipEmbed);
          collector.stop();
          break;

        case "⏯️":
          reaction.users.remove(user);
          if (!canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            const pauseEmbed = new Discord.MessageEmbed()
              .setAuthor("Pause", "https://i.imgur.com/IWXMVFi.png")
              .setColor("#7EB9FF")
              .setDescription(`${song.title}`)
              .setThumbnail(
                `https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`
              )
              .setFooter(`user: ${user.username}`);
            queue.textChannel.send(pauseEmbed);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
            const resumeEmbed = new Discord.MessageEmbed()
              .setAuthor("Resume", "https://i.imgur.com/m09HHoC.png")
              .setColor("#7EB9FF")
              .setDescription(`${song.title}`)
              .setThumbnail(
                `https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`
              )
              .setFooter(`user: ${user.username}`);
            queue.textChannel.send(resumeEmbed);
          }
          break;

        case "🔁":
          reaction.users.remove(user);
          if (!canModifyQueue(member)) return;
          queue.loop = !queue.loop;
          const loopEmbed = new Discord.MessageEmbed()
            .setAuthor("Loop", "https://i.imgur.com/hT5tIut.png")
            .setDescription(`set to [ ${queue.loop ? "**on**" : "**off**"} ]`)
            .setColor("#7EB9FF")
            .setFooter(`user: ${user.username}`);
          queue.textChannel.send(loopEmbed);
          break;

        case "🔀":
          reaction.users.remove(user);
          if (!canModifyQueue(message.member)) return;
          let songs = queue.songs;
          for (let i = songs.length - 1; i > 1; i--) {
            let j = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[j]] = [songs[j], songs[i]];
          }
          queue.songs = songs;
          message.client.queue.set(message.guild.id, queue);
          const shuffleEmbed = new Discord.MessageEmbed()
            .setAuthor("Shuffle", "https://i.imgur.com/yGmONoF.png")
            .setDescription("queue has been shuffled")
            .setColor("#7EB9FF")
            .setFooter(`user: ${user.username}`);
          queue.textChannel.send(shuffleEmbed);
          break;

        case "⏹️":
          reaction.users.remove(user);
          if (!canModifyQueue(member)) return;
          queue.songs = [];
          const stopEmbed = new Discord.MessageEmbed()
            .setAuthor("Stop", "https://i.imgur.com/2glTzD1.png")
            .setColor("#7EB9FF")
            .setDescription(`${song.title}`)
            .setThumbnail(
              `https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`
            )
            .setFooter(`user: ${user.username}`);
          queue.textChannel.send(stopEmbed);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        // case "🔇":
        //   reaction.users.remove(user)
        //   if (!canModifyQueue(member)) return;
        //   if (queue.volume <= 0) {
        //     queue.volume = 100;
        //     queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
        //     queue.textChannel.send(`${user} 🔊 unmuted the music!`)
        //   } else {
        //     queue.volume = 0;
        //     queue.connection.dispatcher.setVolumeLogarithmic(0);
        //     queue.textChannel.send(`${user} 🔇 muted the music!`)
        //   }
        //   break;

        case "🔉":
          reaction.users.remove(user);
          if (!canModifyQueue(member)) return;
          if (queue.volume - 10 <= 0) {
            queue.volume = 0;
            return message.channel.send("Onii chan what you gonna hear?");
          } else queue.volume = queue.volume - 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);

          const volumedownEmbed = new Discord.MessageEmbed()
            .setAuthor("Volume", "https://i.imgur.com/KK6ZEaF.png")
            .setDescription(`set to [ **${queue.volume}** ]`)
            .setColor("#7EB9FF")
            .setFooter(`user: ${user.username}`);
          queue.textChannel.send(volumedownEmbed);
          break;

        case "🔊":
          reaction.users.remove(user);
          if (!canModifyQueue(member)) return;
          if (queue.volume + 10 > 100) {
            queue.volume = 100;
            return message.channel.send("Onii chan are you deaf?");
          } else queue.volume = queue.volume + 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);

          const volumeupEmbed = new Discord.MessageEmbed()
            .setAuthor("Volume", "https://i.imgur.com/KK6ZEaF.png")
            .setDescription(`set to [ **${queue.volume}** ]`)
            .setColor("#7EB9FF")
            .setFooter(`user: ${user.username}`);
          queue.textChannel.send(volumeupEmbed);
          break;

        default:
          reaction.users.remove(user);
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll();
      if (playingMessage && !playingMessage.deleted) {
        playingMessage.delete({ timeout: 3000 });
      }
    });
  }
};
