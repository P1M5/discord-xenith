const ud = require("urban-dictionary");
const { MessageEmbed } = require("discord.js");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");


/**
@static
@description Gives the urban dictionary definition
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Urban extends BasicCommand {
    static name = "urban";
    static description = "Gives the urban dictionary definition";
    static aliases = new Set(["ud"]);
    static category = "Informative";
    static usage = "<definition to search for><number of definition (optional, between"
         " 0 and 9 where 0 is the top definition)>,[wotd <number of definition"
             "(optional)>]";

             static execute(msgToken) {

             	const args = msgToken.args.split(/ +/);

             	let num = 0;
             	let sliceEnd = args.length;

             	if(parseInt(args[args.length - 1]) && args.length > 1) num = parseInt(args[args.length - 1]);
             	if(num < 0 || num > 9) return msgToken.message.channel.send("Definition number needs to be between `0` and `9`");
             	if(num !== 0) sliceEnd = sliceEnd - 1;

             	class udEmbed {

             		constructor(res) {

             			const Defin = {};
             			Object.entries(res[0]).forEach(([key, prop]) => {
             				Defin[key] = prop;
             			});

             			 const embedSend = new MessageEmbed()
             			.setTitle(Defin.word)
             			.setColor("DARK_PURPLE")
             			.setFooter(`Author: ${Defin.author} | Written: ${new Date(Defin.written_on).toLocaleString("en-GB")} | ${msgToken.message.client.ws.ping} ms`)
             			.setTimestamp()
             			.setDescription(Defin.definition)
             			.addField("Example:", Defin.example);

             			msgToken.message.channel.send(embedSend);
             		}
             	}

             	if(args.length == 0) {
             		ud.random().then((results) => {

             			new udEmbed(results);

             		}).catch((error) => {

             			console.error(`Urban dictionary error: ${error.message}`);
             			msgToken.message.channel.send(error.message);

             		});
             	}
             	else if (args[0] === "wotd") {
             		ud.wordsOfTheDay().then((results) => {

             			new udEmbed(results);

             		}).catch((error) => {

             			console.error(`Urban dictionary error: ${error.message}`);
             			if(error.message === "Cannot convert undefined or null to object") return msgToken.message.channel.send("Definition number not found, try a lower number");
             			msgToken.message.channel.send(error.message);

             		});
             	}
             	else {
             		ud.define(args.slice(0, sliceEnd).toString()).then((results) => {

             			new udEmbed(results);

             		}).catch((error) => {
             			console.error(`Urban dictionary error: ${error.message}`);
             			if(error.message === "Cannot convert undefined or null to object") return msgToken.message.channel.send("Definition number not found, try a lower number");
             			msgToken.message.channel.send(error.message);
             		});
             	}
             }
}

module.exports = Urban;
