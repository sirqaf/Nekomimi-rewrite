const { musicPlayer } = require("../../modules/musicPlayer");
const { SOUNDCLOUD_CLIENT_ID } = process.env.SOUNDCLOUD_CLIENT_ID;
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader");

exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;

  if (!args.length) {
    return message.channel.send(
      `Onii chan you must input song name/url, please refer ${message.settings.prefix}help playlink for details`
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
  const url = args[0];
  const urlValid = videoPattern.test(args[0]);

  // start the playlist if playlist url was provided
  if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
    return message.client.commands.get("playlist").run(client, message, args);
  } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
    return message.client.commands.get("playlist").run(client, message, args);
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
    } catch (error) {
      console.error(error);
      return message.reply(error.message).catch(console.error);
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
        return message.channel
          .send("Onii chan i could not find that Soundcloud track.")
          .catch(console.error);
      return message.channel
        .send("Onii chan there was an error playing that Soundcloud track.")
        .catch(console.error);
    }
  } else {
    try {
      const results = await youtube.searchVideos(search, 1);
      songInfo = await ytdl.getInfo(results[0].url);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        id: songInfo.videoDetails.videoId,
        author: songInfo.videoDetails.author.name,
        duration: songInfo.videoDetails.lengthSeconds
      };
    } catch (error) {
      console.error(error);
      return message
        .reply("Onii chan no video was found with a matching title")
        .catch(console.error);
    }
  }

  if (serverQueue) {
    serverQueue.songs.push(song);
    return serverQueue.textChannel
      .send(
        `**${song.title}** has been added to the queue by ${message.author}`
      )
      .catch(console.error);
  }

  queueConstruct.songs.push(song);
  message.client.queue.set(message.guild.id, queueConstruct);

  try {
    queueConstruct.connection = await channel.join();
    await queueConstruct.connection.voice.setSelfDeaf(true);
    musicPlayer(queueConstruct.songs[0], message);
  } catch (error) {
    console.error(error);
    message.client.queue.delete(message.guild.id);
    await channel.leave();
    return message.channel
      .send(`Onii chan i could not join the channel: ${error}`)
      .catch(console.error);
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
