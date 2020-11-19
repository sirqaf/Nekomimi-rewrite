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

const client = new Discord.Client();

// import files
client.config = config;
client.logger = require("./modules/logger");
require("./modules/functions.js")(client);

// define time of startup
client.starttime = new Date();

// define database
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.settings = new Enmap({ name: "settings" });

// music
client.queue = new Map();

const init = async () => {
  // commands handler
  const cmdDirs = [
    "./commands/anime",
    "./commands/fun",
    "./commands/games",
    "./commands/images",
    "./commands/moderation",
    "./commands/music",
    "./commands/utility"
  ];

  cmdDirs.forEach(async dir => {
    const cmdFiles = await readdir(dir);
    //client.logger.log(`Total Commands: ${cmdFiles.length}`);
    cmdFiles.forEach(f => {
      if (!f.endsWith(".js")) return;
      const response = client.loadCommand(f, dir);
      //if (response) client.logger.log(response);
    });
  });

  // events handler
  const evtFiles = await readdir("./events/");
  //client.logger.log(`Total Events: ${evtFiles.length}`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    //client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  // cache permission
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }
  // Initialize Chat bot
  const dialogflow = require("dialogflow");
  const dialogflowClient = new dialogflow.SessionsClient();
  //const mention = `<@${client.user.id}>`;
  // Define session path
  const sessionPath = dialogflowClient.sessionPath(
    process.env.DIALOGFLOW_PROJECT_ID,
    "discordbot"
  );
  client.on("message", m => {
    // Say back what user said
    if (!shouldBeInvoked(m)) {
      return;
    }
    const message = remove(client.user.username, m.cleanContent);

    if (sayBack(m)) {
      m.channel.send(m.content.replace("@neko say", ""));
      return;
    }
    const dialogflowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en-US"
        }
      }
    };

    dialogflowClient.detectIntent(dialogflowRequest).then(responses => {
      m.channel.send(responses[0].queryResult.fulfillmentText);
    });
  });

  function shouldBeInvoked(message) {
    return (
      (message.content.startsWith(`@${client.user.tag}`) ||
        message.content.startsWith("@" + client.user.username) ||
        message.channel.type === "dm") &&
      client.user.id !== message.author.id
    );
  }

  function sayBack(message) {
    return (
      message.content.startsWith(`@${client.user.tag}` + " say") &&
      client.user.id !== message.author.id
    );
  }

  function remove(username, text) {
    return text
      .replace("@" + username + " ", "")
      .replace(`@${client.user.tag}` + " ", "");
  }

  // bot login
  client.login(process.env.DISCORD_TOKEN);
};
init();
