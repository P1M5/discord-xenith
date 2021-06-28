const ud = require("urban-dictionary");
const { MessageEmbed, Util } = require("discord.js");
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
             	let sliceEnd = args.length - 1;
             	let numb = parseInt(args.slice(args.length - 1, args.length));
             	if (isNaN(numb)) {
             		numb = 0;
             		sliceEnd = args.length;
             	}
             	const uinput = args.slice(0, sliceEnd).join(" ");

             	class udEmbed {

             		constructor(res, number = 0, wotd = false) {

             			let titleDef = `(Definition #${number})`;
             			if(wotd) titleDef = `(Wotd #${number})`;
             			if(number === 0) titleDef = "";
             			const Defin = {};
             			Object.entries(res[number]).forEach(([key, prop]) => {
             				Defin[key] = prop;
             			});

             			 const embedSend = new MessageEmbed()
             			.setTitle(`${Defin.word} ${titleDef}`)
             			.setColor("DARK_PURPLE")
             			.setFooter(`Author: ${Defin.author} | Written: ${new Date(Defin.written_on).toLocaleString("en-GB")} | ${msgToken.message.client.ws.ping} ms`)
             			.setTimestamp()
             			.setDescription(Defin.definition)
             			msgToken.message.channel.send(embedSend);
             		}
             	}
             	if(args[0] != "" && args[0] != "wotd") {
             		ud.define(uinput).then((results) => {

             			new udEmbed(results, numb);
             			console.log(args[0]);
             		})
             			.catch((e) => {
             				console.log(`Urban Dictionary: ${e}`);
             				if(e.message == "Cannot convert undefined or null to object") msgToken.message.channel.send("Out of range, try a lower number");
             			});
             	}
             	else if (args[0] == "wotd") {
             		ud.wordsOfTheDay().then((results) => {

             			new udEmbed(results, numb, true);
             		})
             			.catch((e) => {
             				console.log(`Urban Dictionary: ${e}`);
             			});
             	}
             	else {
             		ud.random().then((results) => {

             			new udEmbed(results);
             		})
             			.catch((e) => {
             				console.log(`Urban Dictionary: ${e}`);
             			});
             	}
             }


}

module.exports = Urban;
