const { Collection } = require("discord.js");
const config = require(".././config.json");

class Message {

    static name = "message";

    static execute(message) {

        const client = message.client;
        const isMentionTriggered = message.mentions.has(client.user.id)
        if(message.author.bot || !(message.content.startsWith(config.prefix) || isMentionTriggered)) return;

        let args = this.argParser(message, isMentionTriggered, client.user.id);

        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.has(commandName));
        if(!command) return;

        if (message.author.id != config.owner_id &&                // Skip the cooldown check completely for the owner instead
            !this.cooldownCheck(message, command)) return; // of adding it to the collection like before.

        if(!command.checkConditions(message, args > 0, message.author.id == config.owner_id,
             message.channel.type)) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply(`There was an error executing the command \`${command}\`, please contact the developer if the error persists.`);
        }

        this.memberCountUpdate(client)

    }

    static argParser(message, isMentionTriggered, botId) {
        let args;

        if(isMentionTriggered) {
            const regex = new RegExp("<@.?" + botId + ">", "")
            args = message.content.replace(regex, " ").trim().split(/ +/);
        } else {
            args = message.content.slice(config.prefix.length).trim().split(/ +/);
        }

        return args;
    }

    static cooldownCheck(message, command) {


        let cooldownToken;
        const now = Date.now();

        if(!(cooldownToken = command.userCooldownTracker.get(message.author.id))) {
            const obj = {
                start: now,
                commandName: command.name      // Need command.name here because even now 1 collection is handling all the cooldowns. will be changed later
            }
            command.userCooldownTracker.set(message.author.id, obj);
            setTimeout(() => command.userCooldownTracker.delete(message.author.id), command.cooldown);
            return true;
        }

        const expirationTime = cooldownToken.start + command.cooldown;

        if(cooldownToken.commandName == command.name && now+150 < expirationTime) {   // No need to check owner cooldown here.
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`You need to wait ${timeLeft.toFixed(1)} s before using the \`${command.name}\` command again`);
            return false;
        }
        return true;
    }

    static memberCountUpdate(client) {
        const servers = client.guilds.cache;
        const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
        client.user.setActivity(`over ${servers.size} server/s and ${membersNum} member/s`, {type: "WATCHING"});
    }

}

module.exports = Message;
