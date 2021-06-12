const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");
const debug = require("debug")("DB");


/**
@static
@description
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Help extends BasicCommand {
    static name = "help";
    static description = "Displays all commands or gives information about a specific command";
    static aliases = new Set(["commands","cmds","?"]);
    static usage = "[command name]";
    static category = "General";

    static execute (msgToken) {
        const { commands } = msgToken.message.client;

        if (!msgToken.args) {

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
                if(owner_com && msgToken.message.author.id == config.owner_id) embed.addField("Owner Commands", owner_com)
                if(social_com) embed.addField("Social Commands", social_com)
                .setFooter(`To find more about a specific command use ${config.prefix}help <command name> | ${msgToken.message.client.ws.ping} ms`)
                .setTimestamp()
            return msgToken.message.channel.send(embed);
        }

        const name = msgToken.args.trim().toLowerCase();
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
        msgToken.message.channel.send(embed);

    }
}

module.exports = Help;
