const Discord = require("discord.js");
const { musicPlayer } = require("../../modules/musicPlayer");
const { SOUNDCLOUD_CLIENT_ID } = process.env.SOUNDCLOUD_CLIENT_ID;
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader").default;
const MAX_PLAYLIST_SIZE = 60;

exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;

  if (!args.length) {
    return message.channel.send(
      `Onii chan you must input song name/url, please refer ${client.config.settings.prefix}help playlist for more details`
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
  const perms = voice.permissionsFor(client.user);
  if (!perms.has("CONNECT") || !perms.has("SPEAK")) {
    return message.channel.send(
      "Onii chan you do not have SPEAK/CONNECT permission, use me on another voice channel"
    );
  }

  const search = args.join(" ");
  const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
  const url = args[0];
  const urlValid = pattern.test(args[0]);

  const queueConstruct = {
    textChannel: message.channel,
    channel,
    connection: null,
    songs: [],
    loop: true,
    volume: 100,
    playing: true
  };

  let song = null;
  let playlist = null;
  let videos = [];

  if (urlValid) {
    try {
      playlist = await youtube.getPlaylist(url, { part: "snippet" });
      videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, {
        part: "snippet"
      });
    } catch (error) {
      console.error(error);
      return message.channel.send("Onii chan i cannot found the playlist");
    }
  } else if (scdl.isValidUrl(args[0])) {
    if (args[0].includes("/sets/")) {
      message.channel.send("fetching the playlist..");
      playlist = await scdl.getSetInfo(args[0], SOUNDCLOUD_CLIENT_ID);
      videos = playlist.tracks.map(track => ({
        title: track.title,
        url: track.permalink_url,
        duration: track.duration / 1000
      }));
    }
  } else {
    try {
      const results = await youtube.searchPlaylists(search, 1, {
        part: "snippet"
      });
      playlist = results[0];
      videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, {
        part: "snippet"
      });
    } catch (error) {
      console.error(error);
      return message.channel.send("Onii chan the playlist cannot be found");
    }
  }

  const newSongs = videos.map(video => {
    return (song = {
      title: video.title,
      url: video.url,
      duration: video.durationSeconds
    });
  });

  serverQueue
    ? serverQueue.songs.push(...newSongs)
    : queueConstruct.songs.push(...newSongs);

  const songs = serverQueue ? serverQueue.songs : queueConstruct.songs;

  let playlistEmbed = new Discord.MessageEmbed()
    .setTitle(`${playlist.title}`)
    .setDescription(songs.map((song, index) => `${index + 1}. ${song.title}`))
    .setURL(playlist.url)
    .setColor("#7EB9FF")
    .setImage(playlist.thumbnails.high.url);

  if (playlistEmbed.description.length >= 2048)
    playlistEmbed.description =
      playlistEmbed.description.substr(0, 2007) +
      "\nPlaylist larger than character limit..";

  message.channel.send(`${message.author} started a playlist`, playlistEmbed);

  if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

  if (!serverQueue) {
    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      musicPlayer(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(
        `Onii chan i could not join the channel: ${error}`
      );
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "playlist",
  category: "Music",
  description: "Play youtube playlist",
  usage: "<prefix>playlist <name/url>",
  option: ""
};