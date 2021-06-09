class BasicCommand {

    static name;
    static description = "This is a command";
    static aliases = new Set();
    static usage = "[command name]";
    static category = "General";
    static cooldown = null;
    static guildOnly = false;
    static dmOnly = false;
    static permissions = [];

    static getName(){
        return this.name;
    }

    static getDescription(){
        return this.description;
    }

    static getAliases(){
        if (this.aliases.size < 1) return null;
        return Array.from(this.aliases);
    }

    static getUsage(){
        return this.usage;
    }

    static getCategory(){
        return this.category;
    }

    static getCooldown(){
        return this.cooldown;
    }

    static getDmOnly(){
        return this.dmOnly;
    }

    static getGuildOnly(){
        return this.guildOnly;
    }

    static getPermissions(){
        if (this.aliases.length < 1) return null;
        return this.permissions;
    }

}

exports.BasicCommand = BasicCommand;
