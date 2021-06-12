const { MessageEmbed } = require("discord.js");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");


/**
@static
@description
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Cuddle extends BasicCommand {

	static name = "cuddle"
	static description = "Cuddle with someone"
	static category = "Social"
	static usage = "<user id,username or mention>"

	static execute(msgToken) {

		function getUserFromMention(mention) {
			if (!mention) return;

			if (mention.startsWith("<@") && mention.endsWith(">")) {
				mention = mention.slice(2, -1);

				if (mention.startsWith("!")) {
					mention = mention.slice(1);
				}

				return msgToken.message.client.users.cache.get(mention);
			}
		}

		const num = Math.floor((Math.random() * 3) + 1);
		const embed = new MessageEmbed();
		let user = msgToken.args;
		if(getUserFromMention(user)) {
			user = getUserFromMention(msgToken.args).username;
		}

		switch(num) {
		case 1:
			embed.setTitle(`${msgToken.message.author.username} cuddles with ${(!msgToken.args || user === msgToken.message.author.username) ? "themselves" : user}`);
			embed.setColor("DARK_BLUE");
			embed.setImage("https://media.giphy.com/media/131Q2gKssUNCwM/giphy.gif");
			embed.setFooter(`${msgToken.message.client.ws.ping} ms`);
			embed.setTimestamp();
			msgToken.message.channel.send(embed);
			break;
		case 2:
			embed.setTitle(`${msgToken.message.author.username} cuddles with ${(!msgToken.args) ? "themselves" : user}`);
			embed.setColor("DARK_BLUE");
			embed.setImage("https://media.giphy.com/media/h4BprYiFYNxRe/giphy.gif");
			embed.setFooter(`${msgToken.message.client.ws.ping} ms`);
			embed.setTimestamp();
			msgToken.message.channel.send(embed);
			break;
		case 3:
			embed.setTitle(`${msgToken.message.author.username} cuddles with ${(!msgToken.args) ? "themselves" : user}`);
			embed.setColor("DARK_BLUE");
			embed.setImage("https://media.giphy.com/media/PibhPmQYXZ7HO/giphy.gif");
			embed.setFooter(`${msgToken.message.client.ws.ping} ms`);
			embed.setTimestamp();
			msgToken.message.channel.send(embed);
			break;
		}
	}
}

module.exports = Cuddle;
