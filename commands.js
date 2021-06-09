const { Collection } = require("discord.js");

class BasicCommand {

    static name;
    static description = "This is a command";
    static aliases = new Set();
    static args = false;
    static usage = "<prefix>[command name]";
    static category = "General";
    static cooldown = null;
    static guildOnly = false;
    static dmOnly = false;
    static ownerOnly = false;
    static cooldown = 5000;
    static userCooldownTracker = new Collection();
    static permissions = [];

    static checkConditions(message, argsExist, isUserOwner, channelType) {
        return this.checkUserPermissions(message, isUserOwner, channelType)
            && this.checkArgs(message, argsExist);
    }

    static checkUserPermissions(message, isUserOwner, channelType) {

        let ownerVar = true;
        let typeVar = true;

        if (isUserOwner) {
            ownerVar = true;
        } else if (this.ownerOnly) {
            ownerVar = false;
        }

        if (this.guildOnly && channelType === "dm") {
            message.channel.send("You can't execute this command outside a Server")
            typeVar = false;
        }
        if(this.dmOnly && channelType !== "dm") {
            message.channel.send("You can't execute this command outside of Direct Messages")
            typeVar = false;
        }

        return ownerVar && typeVar;
    }

    static checkArgs(message, argsExist) {
        if(this.args && !argsExist) { // change so the commands handle the args
            let reply = "You didn't provide any arguments";
            reply += ` \`Usage: ${this.usage}\``;
            message.reply(reply);
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
