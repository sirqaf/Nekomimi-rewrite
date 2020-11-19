const Discord = require("discord.js");
const fetch = require("node-fetch");

exports.run = async (client, message, args, level) => {

var rng = Math.floor(Math.random() * 3) + 0;
var url = new Array;
//console.log("url rng is: " + rng)
url = ["https://www.reddit.com/r/animenocontext/top/.json", 
"https://www.reddit.com/r/anime_irl/top/.json"
]

fetch(url[rng])
  .then(function(response) {
     return response.json();
   })
  .then(function(jsonObj) {

    var data = jsonObj.data;
    var children = data.children;
    var imgUrl = new Array;
 
    for (var i = 1; i < children.length; i++) {
     var childData = children[i].data;
    imgUrl[i]= childData.url;
    };    
    var rng = Math.floor(Math.random() * children.length - 3 + 1) + 3;
    console.log("children number = " + children.length)
    console.log("Meme rng is" + rng)
    //var imgFile = imgUrl[rng];
     if(imgUrl[rng].startsWith("https://i.redd.it/")){
       var imgFile = imgUrl[rng]
       message.channel.send("Here you go thirsty onii chan")
       console.log(imgFile);
    message.channel.send({
      files: [imgFile]
    })
  }else {
    console.log("url cannot be retrieved")
message.channel.send("Gomenasai onii chan there nothing to show you")
  } 
  })
  .catch(err => { 
    console.log(err);
  message.channel.send("Gomenasai onii chan there is nothing to show you");
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["anc"],
  permLevel: "User"
};

exports.help = {
  name: "animenocontext",
  category: "Anime",
  description: "Search for anime without context",
  usage: "<prefix>animenocontext",
  option: ""
};
