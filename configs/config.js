const config = {
  // user role id
  ownerID: "378003303918862357",
  admins: [
    "575311311873769482",
    "427761777015652354",
    "744916692500480000",
    "614839790835204126",
    "778105551095332884",
    "688918523896004623",
    "768829430104719360"
  ],
  support: [],

  // default bot settings
  settings: {
    prefix: "/",
    modLogChannelId: "662911415451123712",
    modRole: "Moderator",
    adminRole: "Administrator",
    systemNotice: "true", // perm-low notice
    welcomeChannel: "uwu",
    welcomeMessage: "Moshi moshi, welcome {{user}} to {{guild}}",
    welcomeEnabled: "true"
  },

  // permission level
  permLevels: [
    { level: 0, name: "User", check: () => true },
    {
      level: 2,
      name: "Moderator",
      check: message => {
        try {
          const modRole = message.guild.roles.cache.find(
            r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
          );
          if (modRole && message.member.roles.cache.has(modRole.id))
            return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 3,
      name: "Administrator",
      check: message => {
        try {
          const adminRole = message.guild.roles.cache.find(
            r =>
              r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
          );
          return adminRole && message.member.roles.cache.has(adminRole.id);
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 4,
      name: "Server Owner",
      check: message =>
        message.channel.type === "text"
          ? message.guild.ownerID === message.author.id
            ? true
            : false
          : false
    },
    {
      level: 8,
      name: "Bot Support",
      check: message => config.support.includes(message.author.id)
    },
    {
      level: 9,
      name: "Bot Admin",
      check: message => config.admins.includes(message.author.id)
    },
    {
      level: 10,
      name: "Bot Owner",
      check: message => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
