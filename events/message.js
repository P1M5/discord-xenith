const { Collection } = require("discord.js");
const config = require(".././config.json");

class Message {

    static name = "message";

    static execute(message) {

        const client = message.client;
        const mentionMessage = message.mentions.has(client.user.id)

        if(!message.content.startsWith(config.prefix) && !mentionMessage
            && message.author.bot) return;

        let args;
        if(mentionMessage) {
            args = message.content.slice(client.user.id.length + 4).trim().split(/ +/);
        } else {
            args = message.content.slice(config.prefix.length).trim().split(/ +/);
        }

        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.has(commandName));
        if(!command) return;

        if(command.ownerOnly && message.author.id !== config.owner_id) return;

        const { cooldowns } = client;
        if(!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 5) * 1000;
        if(timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if(now < expirationTime && message.author.id !== config.owner_id) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`You need to wait ${timeLeft.toFixed(1)} s before using the \`${commandName}\` command again`)
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if(command.args && !args.length) { // change so the commands handle the args
            let reply = "You didn't provide any arguments";
            reply += ` \`Usage: ${command.usage}\``;
            return message.reply(reply);
        }

        if(command.guildOnly && message.channel.type === "dm") {
            message.channel.send("You can't execute this command in Direct Messages")
        }

        if(command.dmOnly && message.channel.type !== "dm") {
            message.channel.send("You can't execute this command outside of Direct Messages")
        }


        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply(`There was an error executing the command \`${command}\`, please contact the developer if the error persists.`);
        }

    }

    static memberCountUpdate() {
        const servers = client.guilds.cache;
        const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
        client.user.setActivity(`over ${servers.size} server/s and ${membersNum} member/s`, {type: "WATCHING"});
    }

}

module.exports = Message;
