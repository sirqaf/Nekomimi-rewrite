const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const isPlaying = client.player.isPlaying(message.guild.id);

  // Check whether args has song name
  const name = args.join(" ");
  if (!name) {
    return message.channel.send("Onii chan you must input song name");
  }

  // Check whether user in voice channel or not
  const voice = message.member.voice.channel;
  if (!voice) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }

  let trackToPlay;
  let isPlaylist;

  // Check my permissions
  const perms = voice.permissionsFor(client.user);
  if (!perms.has("CONNECT") || !perms.has("SPEAK")) {
    return message.channel.send(
      "Onii chan you do not have SPEAK/CONNECT permission, use me on another voice channel"
    );
  }

  // Find song
  const tracks = await client.player
    .searchTracks(args.join(" "), true)
    .catch(() => {});
  if (!tracks || !tracks[0]) {
    return message.channel.send("Onii chan i cant find that song");
  } else if (tracks[0].fromPlaylist) {
    trackToPlay = args.join(" ");
    isPlaylist = true;
  } else if (
    args
      .join(" ")
      .match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
      )
  ) {
    trackToPlay = tracks[0];
  } else {
    // Song has been found
    try {
      if (tracks.length > 9) tracks.splice(9);
      let i = 0;
      // Song menu
      const embed = new Discord.MessageEmbed()
        .setDescription(tracks.map(t => `**${++i}** - ${t.name}`).join("\n"))
        .setColor("#7EB9FF");
      message.channel.send(embed);
      // Wait for answer
      await message.channel
        .awaitMessages(m => m.content > 0 && m.content <= 9, {
          max: 1,
          time: 20000,
          errors: ["time"]
        })
        .then(async answers => {
          const index = parseInt(answers.first().content, 9);
          trackToPlay = tracks[index - 1];
        })
        .catch(err => {
          console.log(err);
          message.channel.send("Onii chan time is up");
          return;
        });
    } catch (err) {
      console.log(err);
      return message.channel.send("Onii chan i cant find that song");
    }
  }
  // Delete song menu
  message.channel.bulkDelete(2);
  if (trackToPlay) {
    if (isPlaying) {
      const result = await client.player.addToQueue(
        message.guild.id,
        trackToPlay,
        message.author
      );
      if (isPlaylist) {
        message.channel.send("Added to queue", {
          songCount: result.tracks.length
        });
      } else {
        message.channel.send("Added to queue", {
          songName: trackToPlay.name
        });
      }
    } else {
      const result = await client.player.play(
        voice,
        trackToPlay,
        message.author
      );
      if (isPlaylist) {
        message.channel.send("Queue list", {
          songCount: result.tracks.length
        });
      }
      const queue = client.player.getQueue(message.guild.id);
      const track = await client.player.nowPlaying(message.guild.id);

      // Now playing embed
      const nowPlayingEmbed = new Discord.MessageEmbed()
        .setAuthor(
          "Now Playing",
          "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fplay.png?v=1598773025944"
        )
        .setColor("#7EB9FF")
        .setImage(track.thumbnail)
        .addField("• Title", track.name)
        .addField("• Duration", track.duration)
        .setFooter(track.author.toLowerCase());
      // Events
      queue
        .on("end", () => {
          message.channel.send("Queue ended");
        })
        .on("trackChanged", (oldTrack, newTrack, skipped, repeatMode) => {
          const newTrackEmbed = new Discord.MessageEmbed()
            .setAuthor(
              "Now Playing",
              "https://cdn.glitch.com/ee8b7266-52ce-4183-a772-33c4a40a6915%2Fplay.png?v=1598773025944"
            )
            .setColor("#7EB9FF")
            .setImage(newTrack.thumbnail)
            .addField("• Title", newTrack.name)
            .addField("• Duration", newTrack.duration)
            .setFooter(newTrack.author.toLowerCase());

          message.channel.send(newTrackEmbed);
        });

      message.channel.send(nowPlayingEmbed);
    }
  } else {
    return message.channel.send("Onii chan no results can be find");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play youtube song/url",
  usage: "<prefix>play <name/url>",
  option: ""
};
