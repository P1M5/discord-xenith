const { Util, MessageEmbed } = require("discord.js");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");


/**
@static
@description Cuddle with someone
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Cuddle extends BasicCommand {

	static name = "cuddle";
	static description = "Cuddle with someone";

	static execute(msgToken) {

		const num = Math.floor((Math.random() * 3) + 1);
		let user;
		 if(msgToken.args.startsWith("<@")) {
			 user = Util.cleanContent(msgToken.args, msgToken.message).substring(2);
		 }
		else {
			user = msgToken.args.split(/ +/)[0];
		}

		function CuddleEmbed(image) {
			const embed = new MessageEmbed()
				.setTitle(`${msgToken.message.author.username} cuddles with ${(!msgToken.args || user === msgToken.message.author.username) ? "themselves" : user}`)
				.setTimestamp()
				.setColor("DARK_PURPLE")
				.setFooter(`${msgToken.message.client.ws.ping} ms`)
			  .setImage(image);
			msgToken.message.channel.send(embed);
		}

		switch(num) {
		case 1:
			CuddleEmbed("https://media.giphy.com/media/131Q2gKssUNCwM/giphy.gif");
			break;
		case 2:
			CuddleEmbed("https://media.giphy.com/media/h4BprYiFYNxRe/giphy.gif");
			break;
		case 3:
			CuddleEmbed("https://media.giphy.com/media/PibhPmQYXZ7HO/giphy.gif");
			break;
		}
	}
}

module.exports = Cuddle;
