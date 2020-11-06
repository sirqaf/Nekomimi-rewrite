if (Number(process.version.slice(1).split(".")[0]) < 12)
  throw new Error(
    "Node 12.0.0 or higher is required. Update Node on your system."
  );

// load modules
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const config = require("./configs/config.js");

const client = new Discord.Client({
  ws: {
    intents: config.intents,
  },
});

// import files
client.config = config;
client.logger = require("./modules/logger");
require("./modules/functions.js")(client);

// Define time of startup
client.starttime = new Date();

// define database
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({ name: "settings" });

// initialize music player
const { Player } = require("discord-player");
const player = new Player(client, {
  leaveOnEmpty: true,
  leaveOnEnd: true,
  leaveOnStop: true,
});
client.player = player;

const init = async () => {
  // commands handler
  const cmdDirs = [
    "./commands/anime",
    "./commands/fun",
    "./commands/games",
    "./commands/images",
    "./commands/moderation",
    "./commands/music",
    "./commands/utility",
  ];

  cmdDirs.forEach(async (dir) => {
    const cmdFiles = await readdir(dir);
    client.logger.log(`Total Commands: ${cmdFiles.length}`);
    cmdFiles.forEach((f) => {
      if (!f.endsWith(".js")) return;
      const response = client.loadCommand(f, dir);
      if (response) client.logger.log(response);
    });
  });

  // events handler
  const evtFiles = await readdir("./events/");
  client.logger.log(`Total Events: ${evtFiles.length}`);
  evtFiles.forEach((file) => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  // generate cache for perm
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // bot login
  client.login(process.env.DISCORD_TOKEN);
};
init();
