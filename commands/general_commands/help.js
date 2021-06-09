const config = require("../.././config.json");
const { MessageEmbed } = require("discord.js");
const { BasicCommand } = require("../.././commands.js");


module.exports = class Help extends BasicCommand {
    static name = "help";
    static description = "Displays all commands or gives information about a specific command";
    static aliases = new Set(["commands","cmds","?"]);
    static usage = "[command name]";
    static category = "General";

    static execute (message, args) {

        console.log("EMBED YA FUCK");
        console.log(args.length);

        const { commands } = message.client;

        if (!args.length) {
            console.log("EMBED YA ARG FUCK");
            commands.filter(Boolean);
            const ai_com = commands.filter(command => command.category === "AI").map(command => command.name).join(", ");
            const card_com = commands.filter(command => command.category === "Cardcord").map(command => command.name).join(", ");
            const gen_com = commands.filter(command => command.category === "General").map(command => command.name).join(", ");
            const misc_com = commands.filter(command => command.category === "Miscellaneous").map(command => command.name).join(", ");
            const mod_com = commands.filter(command => command.category === "Moderation").map(command => command.name).join(", ");
            const owner_com = commands.filter(command => command.category === "Owner").map(command => command.name).join(", ");
            const social_com = commands.filter(command => command.category === "Social").map(command => command.name).join(", ");

            const embed = new MessageEmbed()
                .setTitle("Commands List")
                .setColor("DARK_BLUE")
                if(ai_com) embed.addField("AI Commands", ai_com)
                if(card_com) embed.addField("Cardcord Commands", card_com)
                if(gen_com) embed.addField("General Commands", gen_com)
                if(misc_com) embed.addField("Miscellaneous Commands", misc_com)
                if(mod_com) embed.addField("Moderation Commands", mod_com)
                if(owner_com && message.author.id == config.owner_id) embed.addField("Owner Commands", owner_com)
                if(social_com) embed.addField("Social Commands", social_com)
                .setFooter(`To find more about a specific command use ${config.prefix}help <command name> | ${message.client.ws.ping} ms`)
                .setTimestamp()
            return message.channel.send(embed);
        }
        console.log("EMBED NO WORK YA FUCK");
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.has(name));
        if (!command) {
            return message.reply("That's not a valid command")
        }

        if (command.ownerOnly && message.author.id !== config.owner_id) return;

        const embed = new MessageEmbed()
            .setTitle(command.getName())
            .setColor("DARK_BLUE");
            (command.getAliases()) && embed.addField("Aliases:", command.getAliases().join(", "));
            (command.getDescription()) && embed.addField("Description:", command.description);
            (command.getUsage())  && embed.addField("Usage:", command.usage);
            (command.getCooldown()) && embed.addField("Cooldown:", `${command.cooldown} seconds`);
            (command.getGuildOnly()) && embed.addField("Guild Only:", command.guildOnly.toString()[0].toUpperCase() + command.guildOnly.toString().substr(1));
            (command.getDmOnly()) && embed.addField("DM Only:", command.dmOnly.toString()[0].toUpperCase() + command.dmOnly.toString().substr(1));
            (command.args) && embed.addField("Required arguments:", command.args.toString()[0].toUpperCase() + command.args.toString().substr(1));
            embed.setTimestamp()
        message.channel.send(embed);

    }
}
