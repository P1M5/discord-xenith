const { Collection } = require("discord.js");

class BasicCommand {

    static name;
    static description = "This is a command";
    static aliases = new Set();
    static args = false;
    static usage = "<prefix>[command name]";
    static category = "General";
    static guildOnly = false;
    static dmOnly = false;
    static ownerOnly = false;
    static cooldown = 5000;
    static userCooldownTracker = new Collection();
    static permissions = [];

    static checkConditions(msgToken, isUserOwner, channelType) {
    	return this.checkUserPermissions(msgToken.message, isUserOwner, channelType)
            && this.checkArgs(msgToken);
    }

    static checkUserPermissions(message, isUserOwner, channelType) {

    	let ownerVar = true;
    	let typeVar = true;

    	if (isUserOwner) {
    		ownerVar = true;
    	}
    	else if (this.ownerOnly) {
    		ownerVar = false;
    	}

    	if (this.guildOnly && channelType === "dm") {
    		message.channel.send("You can't execute this command outside a Server");
    		typeVar = false;
    	}
    	if(this.dmOnly && channelType !== "dm") {
    		message.channel.send("You can't execute this command outside of Direct Messages");
    		typeVar = false;
    	}

    	return ownerVar && typeVar;
    }

    static checkArgs(msgToken) {
    	if(this.args && !msgToken.args) { // change so the commands handle the args
    		let reply = "You didn't provide any arguments";
    		reply += ` \`Usage: ${this.usage}\``;
    		msgToken.message.reply(reply);
    		return false;
    	}
    	return true;
    }

    static checkCooldown(message) {

    	const cooldownToken = this.userCooldownTracker.get(message.author.id);
    	const now = Date.now();

    	if(!cooldownToken) {
    		const obj = {
    			start: now,
    			commandName: this.name, // Need this.name here because even now 1 collection is handling all the cooldowns. will be changed later
    		};
    		this.userCooldownTracker.set(message.author.id, obj);
    		setTimeout(() => this.userCooldownTracker.delete(message.author.id), this.cooldown);
    		return true;
    	}

    	const expirationTime = cooldownToken.start + this.cooldown;

    	if(cooldownToken.commandName == this.name && now + 150 < expirationTime) { // No need to check owner cooldown here.
    		const timeLeft = (expirationTime - now) / 1000;
    		message.reply(`You need to wait ${timeLeft.toFixed(1)} s before using the \`${this.name}\` command again`);
    		return false;
    	}
    	return true;
    }

    static getName() {
    	return this.name;
    }

    static getDescription() {
    	return this.description;
    }

    static getAliases() {
    	if (this.aliases.size < 1) return null;
    	return Array.from(this.aliases);
    }

    static getUsage() {
    	return this.usage;
    }

    static getCategory() {
    	return this.category;
    }

    static getCooldown() {
    	return this.cooldown;
    }

    static getDmOnly() {
    	return this.dmOnly;
    }

    static getGuildOnly() {
    	return this.guildOnly;
    }

    static getPermissions() {
    	if (this.aliases.length < 1) return null;
    	return this.permissions;
    }

}

exports.BasicCommand = BasicCommand;
