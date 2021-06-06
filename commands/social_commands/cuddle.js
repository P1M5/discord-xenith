const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "cuddle",
	description: "Cuddle with someone",
	category: "Social",
	usage: "<user id,username or mention>",
	execute(message, args) {

		function getUserFromMention(mention) {
			if (!mention) return;

			if (mention.startsWith("<@") && mention.endsWith(">")) {
				mention = mention.slice(2, -1);

				if (mention.startsWith("!")) {
					mention = mention.slice(1);
				}

				return message.client.users.cache.get(mention);
			}
		}
		const num = Math.floor((Math.random() * 3) + 1);
		const embed = new MessageEmbed();
		let user = args[0];
		if(getUserFromMention(user)) {
			user = getUserFromMention(args[0]).username;
		}

		switch(num) {
		case 1:
			embed.setTitle(`${message.author.username} cuddles with ${(args.length < 1 || user === message.author.username) ? "themselves" : user}`);
			embed.setColor("DARK_BLUE");
			embed.setImage("https://media.giphy.com/media/131Q2gKssUNCwM/giphy.gif");
			embed.setFooter(`${message.client.ws.ping} ms`);
			embed.setTimestamp();
			message.channel.send(embed);
			break;
		case 2:
			embed.setTitle(`${message.author.username} cuddles with ${(args.length < 1) ? "themselves" : user}`);
			embed.setColor("DARK_BLUE");
			embed.setImage("https://media.giphy.com/media/h4BprYiFYNxRe/giphy.gif");
			embed.setFooter(`${message.client.ws.ping} ms`);
			embed.setTimestamp();
			message.channel.send(embed);
			break;
		case 3:
			embed.setTitle(`${message.author.username} cuddles with ${(args.length < 1) ? "themselves" : user}`);
			embed.setColor("DARK_BLUE");
			embed.setImage("https://media.giphy.com/media/PibhPmQYXZ7HO/giphy.gif");
			embed.setFooter(`${message.client.ws.ping} ms`);
			embed.setTimestamp();
			message.channel.send(embed);
			break;
		}
	},
};
