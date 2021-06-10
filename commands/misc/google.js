const googleIt = require("google-it");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");
const { MessageEmbed } = require("discord.js");


/**
@static
@description
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Google extends BasicCommand {
    static name = "google";
    static description = "Search google for something";
    static aliases = new Set(["search"]);
    static category = "Miscellaneous";
    static usage = "<search text>";
    static args = true;

    static execute (msgToken) {
        const embedInit = new MessageEmbed()
        .setTitle("Loading...")
        .setColor("DARK_BLUE")
        .setDescription("Please wait")
        .setTimestamp()
        .setFooter(`${msgToken.message.client.ws.ping} ms`)
        msgToken.message.channel.send(embedInit).then((msg) => {
        async function sendMsg() {
         let searchRes = await googleIt({"query": msgToken.args, "disableConsole": true});
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
         .setFooter(`${msgToken.message.client.ws.ping} ms`)
         msg.edit(embed);
        };
        sendMsg()
        .catch(e => e.message);
        })
        .catch(e => e.message);
        }
        }


module.exports = Google;
