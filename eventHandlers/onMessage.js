const dotenv = require("dotenv").config();

class Message {

    static name = "message";

    static execute(message) {

    	const client = message.client;
    	const isPrefixTriggered = message.content.startsWith(process.env.prefix);
    	if(message.author.bot || !(isPrefixTriggered || message.mentions.has(client.user.id))) return;

    	const args = this.argParser(message, isPrefixTriggered, client.user.id);

    	const commandName = args.shift().toLowerCase();

    	const msgToken = {
    		message: message,
    		commandName: commandName,
    		args: args.join(" "),
    	};

    	const command = client.commands.get(msgToken.commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.has(msgToken.commandName));
    	if (!command) return;

    	if (msgToken.message.author.id != process.env.owner_id &&
            !command.cooldownCheck(message)) return;
    	if(!command.checkConditions(msgToken, msgToken.message.author.id == process.env.owner_id,
    		message.channel.type)) return;
    	try {
    		command.execute(msgToken);
    	}
    	catch (error) {
    		console.error(error);
    		message.reply(`There was an error executing the command \`${command.name}\`, please contact the developer if the error persists.`);
    	}

    	this.memberCountUpdate(client); // Needs to be made async for now
    }

    static argParser(message, isMentionTriggered, botId) {
    	let args;
    	if(isMentionTriggered) {
    		args = message.content.slice(process.env.prefix.length);
    	}
    	else {
    		const regex = new RegExp("<@.?" + botId + ">", "");
    		args = message.content.replace(regex, " ");
    	}

    	return args.trim().split(" ");
    }

    static memberCountUpdate(client) {
    	const servers = client.guilds.cache;
    	const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
    	client.user.setActivity(`over ${servers.size} server/s and ${membersNum} member/s`, { type: "WATCHING" });
    }

}

module.exports = Message;
