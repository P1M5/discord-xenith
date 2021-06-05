const googleIt = require("google-it");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "google",
    description: "Search google for something",
    aliases: ["search"],
    category: "Miscellaneous",
    usage: "<search text>",
    args: true,
    execute (message, args) {
      const embedInit = new MessageEmbed()
      .setTitle("Loading...")
      .setColor("DARK_BLUE")
      .setDescription("Please wait")
      .setTimestamp()
      .setFooter(`${message.client.ws.ping} ms`)
      message.channel.send(embedInit).then((msg) => {
      async function sendMsg() {
         let searchRes = await googleIt({"query": args.toString(), "disableConsole": true});
         const firstEl = await searchRes.slice(0,3);
         const embed = new MessageEmbed()
         .setTitle("Google Search")
         .setColor("DARK_BLUE")
         .addFields(
           {name: "\u200B",value: "\u200B"},
           {name: `1. ${firstEl[0].title}`,value: "\u200B"},
           {name: "\u200B",value: `[Link](${firstEl[0].link})`},
           {name: "\u200B",value: firstEl[0].snippet},
           {name: "\u200B",value: "\u200B"},
           {name: `2. ${firstEl[1].title}`,value: "\u200B"},
           {name: "\u200B",value: `[Link](${firstEl[1].link})`},
           {name: "\u200B",value: firstEl[1].snippet},
           {name: "\u200B",value: "\u200B"},
           {name: `3. ${firstEl[2].title}`,value: "\u200B"},
           {name: "\u200B",value: `[Link](${firstEl[2].link})`},
           {name: "\u200B",value: firstEl[2].snippet},
           {name: "\u200B",value: "\u200B"}
         )
         .setTimestamp()
         .setFooter(`${message.client.ws.ping} ms`)
         msg.edit(embed);
       };
       sendMsg()
       .catch(e => e.message);
     })
     .catch(e => e.message);
    },
  };
