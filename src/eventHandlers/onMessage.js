const config = require("../../config/config.json");

class Message {

    static id = "message";

    static execute(message) {

    	const client = message.client;
    	const isPrefixTriggered = message.content.startsWith(config.prefix);

        if (message.author.bot) return;

        if (message.content == "bang") {
            message.reply("the pussy!")
        }
        if (message.content == "pussy") {
            message.reply("bang!")
        }
        if (message.content.match((/.*peabotty.*/i)) || message.content.match((/.*Zenith.*/i))) {
            message.reply("Xenith*")
        }

        if (message.content.match((/.*peabotty.*/i)) || message.content.match((/.*Zenith.*/i))) {
            message.reply("Xenith*")
        }

        const test = message.content.match((/Probot| L |Lawliet|karuta|Dyno/i))
        if (test) {
            message.reply(`${test} is trash. Xenith bestie`)
        }

        const test2 = message.content.match((/Mee|Mee6|DokiDoki|Doki|Drpg|dungeon rpg|dungeonrpg/i))
        if (test2) {
            message.reply(`${test2} is my frien :)`)
        }

        const te = message.content.match((/Xandria/i))
        if (te) {
            message.reply(`${te} is my sister :)`)
        }

        const test22 = message.content.match((/pocket.u|poket.u/i))
        if (test22) {
            message.reply(`${test22} is a bitch`)
        }

        const test23 = message.content.match((/heroku/i))
        if (test23) {
            message.reply(`I want ${test23}`)
        }

        const test3 = message.content.match((/p1m5|p1m|pim5|pim/i))
        if (test3) {
            message.reply(`${test3} is my owner and frien :)`)
        }

        if (message.content == "pussy bang" || message.content == "bang the pussy") {
            message.reply("this is not an nsfw channel. You will now be terminated")
        }

        const final = message.content.match((/leave this in for final/i))
        if (final) {
            message.reply(`yes`)
        }


    	if (message.author.bot || !(isPrefixTriggered || message.mentions.has(client.user.id))) return;

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

    	if (msgToken.message.author.id != config.owner_id &&
            !command.checkCooldown(message)) return;
    	if(!command.checkConditions(msgToken, msgToken.message.author.id == config.owner_id,
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
    		args = message.content.slice(config.prefix.length);
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
