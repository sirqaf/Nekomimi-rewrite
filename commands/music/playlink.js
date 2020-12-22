const { musicPlayer } = require("../../modules/musicPlayer");
const { SOUNDCLOUD_CLIENT_ID } = process.env.SOUNDCLOUD_CLIENT_ID;
const ytdl = require("ytdl-core");
const youtube = require("youtube-sr");
const scdl = require("soundcloud-downloader").default;
const https = require("https");

exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;

  if (!args.length) {
    return message.channel.send(
      `Onii chan you must input song name/url, please refer ${client.config.settings.prefix}help playlink for details`
    );
  }
  const voice = message.member.voice.channel;
  if (!voice) {
    return message.channel.send("Onii chan you are not in a voice channel");
  }
  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && channel !== message.guild.me.voice.channel)
    return message.channel.send(
      `Onii chan you must be in the same channel as me`
    );

  const perms = message.member.voice.channel.permissionsFor(client.user);
  if (!perms.has("CONNECT") || !perms.has("SPEAK")) {
    return message.channel.send(
      "Onii chan you do not have SPEAK/CONNECT permission, use me on another voice channel"
    );
  }

  const search = args.join(" ");
  const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
  const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
  const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
  const url = args[0];
  const urlValid = videoPattern.test(args[0]);

  // start the playlist if playlist url was provided
  if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
    return message.client.commands.get("playlist").run(client, message, args);
  } else if (url.includes("/sets/")) {
    return message.client.commands.get("playlist").run(client, message, args);
  }

  // mobile soundcloud link
  if (mobileScRegex.test(url)) {
    try {
      https.get(url, function(res) {
        if (res.statusCode == "302") {
          return message.client.commands
            .get("play")
            .run(client, message, [res.headers.location]);
        } else {
          return message.channel.send(
            "Onii chan i could not find that Soundcloud track"
          );
        }
      });
    } catch (err) {
      console.log(err);
      return message.channel.send(
        "Onii chan there was an error playing that Soundcloud track"
      );
    }
  }

  const queueConstruct = {
    textChannel: message.channel,
    channel,
    connection: null,
    songs: [],
    loop: false,
    volume: 100,
    playing: true
  };

  let songInfo = null;
  let song = null;

  if (urlValid) {
    try {
      songInfo = await ytdl.getInfo(url);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        id: songInfo.videoDetails.videoId,
        author: songInfo.videoDetails.author.name,
        duration: songInfo.videoDetails.lengthSeconds
      };
    } catch (err) {
      console.log(err);
      return message.channel.send("Onii chan there was an error occurred");
    }
  } else if (scRegex.test(url)) {
    try {
      const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
      song = {
        title: trackInfo.title,
        url: trackInfo.permalink_url,
        duration: Math.ceil(trackInfo.duration / 1000)
      };
    } catch (error) {
      if (error.statusCode === 404)
        return message.channel.send(
          "Onii chan i could not find that Soundcloud track"
        );

      return message.channel.send(
        "Onii chan there was an error playing that Soundcloud track"
      );
    }
  } else {
    try {
      const results = await youtube.search(search, { limit: 1 });
      songInfo = await ytdl.getInfo(results[0].url);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        id: songInfo.videoDetails.videoId,
        author: songInfo.videoDetails.author.name,
        duration: songInfo.videoDetails.lengthSeconds
      };
    } catch (err) {
      console.log(err);
      return message.reply(
        "Onii chan no video was found with a matching title"
      );
    }
  }

  if (serverQueue) {
    serverQueue.songs.push(song);
    return serverQueue.textChannel.send(
      `**${song.title}** has been added to the queue by ${message.author}`
    );
  }

  queueConstruct.songs.push(song);
  message.client.queue.set(message.guild.id, queueConstruct);

  try {
    queueConstruct.connection = await channel.join();
    await queueConstruct.connection.voice.setSelfDeaf(true);
    musicPlayer(queueConstruct.songs[0], message);
  } catch (err) {
    console.log(err);
    message.client.queue.delete(message.guild.id);
    await channel.leave();
    return message.channel.send(
      `Onii chan i could not join the channel: ${err}`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "playlink",
  category: "Music",
  description: "Play song/url (youtube/soundcloud)",
  usage: "<prefix>playlink <name/url>",
  option: ""
};
