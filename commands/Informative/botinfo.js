const { MessageEmbed, version } = require("discord.js");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");
const botVersion = require("../.././package.json").version;


/**
@static
@description Displays the list of commands
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class BotInfo extends BasicCommand {

    static name = "botinfo";
    static description = "Info about the bot";
    static aliases = new Set(["about", "bi", "bot"]);
    static category = "Informative";

    static execute(msgToken) {

    	const client = msgToken.message.client;

    	let seconds = client.uptime / 1000;
    	const days = Math.floor(seconds / 86400);
    	seconds %= 86400;
    	const hours = Math.floor(seconds / 3600);
    	seconds %= 3600;
    	const minutes = Math.floor(seconds / 60);
    	seconds %= 60;
    	seconds = Math.floor(seconds);

    	const dateNow = new Date;
    	const { createdAt } = client.user;
    	const dateDif = dateNow.getFullYear() - createdAt.getFullYear();
    	const dateDifMon = (dateDif * 12) + (dateNow.getMonth() - createdAt.getMonth());
    	const dateCreated = new Date(createdAt.getTime());
    	const optionsD = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    	const servers = client.guilds.cache;
    	const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
    	let ms, ss, mons; ms = ss = mons = "";
  		if(membersNum > 1) ms = "s";
  		if(servers.size > 1) ss = "s";
    	if(dateDifMon > 1) mons = "s";

    	const embed = new MessageEmbed()
    		.setTitle("About")
    		.setColor("DARK_PURPLE")
    		.setThumbnail(client.user.displayAvatarURL())
    		.setFooter(`${msgToken.message.client.ws.ping} ms`)
    		.setTimestamp()
    		.addFields(
    			{ name: "Serving:", value: `${servers.size} server${ss} and ${membersNum} member${ms}` },
    			{ name: "Bot version:", value:  botVersion },
    			{ name: "Discord.js version:", value: version },
    			{ name: "Memory Usage:", value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB` },
    			{ name: "Uptime:", value: `Uptime is ${days}d, ${hours}h, ${minutes}m and ${seconds}s` },
    			{ name: "Ping:", value: `${client.ws.ping} ms` },
    			{ name: "Birthday:", value: `${dateCreated.toLocaleString("en-GB", optionsD)} (${dateDifMon} month${mons} ago)` },
    		);
    	msgToken.message.channel.send(embed);
    }
}

module.exports = BotInfo;
