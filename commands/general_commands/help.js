const config = require("/mnt/0849b5ba-151d-421f-86c8-ded2b93a54bf/P1M5/Programming Resources/Discord/PeaBotty/package.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "help",
    description: "Displays all commands or gives information about a specific command",
    aliases: ["commands","cmds","?"],
    usage: "[command name]",
    category: "General",
    execute (message, args) {
        const { commands } = message.client;

        if (!args.length) {
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
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));
        if (!command) {
            return message.reply("That's not a valid command")
        }
        if (command.ownerOnly && message.author.id !== config.owner_id) return;
        const embed = new MessageEmbed()
            .setTitle(command.name)
            if(command.aliases) embed.addField("Aliases:", command.aliases.join(", "));
            if(command.description) embed.addField("Description:", command.description);
            if(command.usage) embed.addField("Usage:", command.usage);
            if(command.cooldown) embed.addField("Cooldown:", `${command.cooldown} seconds`);
            if(command.guildOnly) embed.addField("Guild Only:", command.guildOnly.toString()[0].toUpperCase() + command.guildOnly.toString().substr(1));
            if(command.dmOnly) embed.addField("DM Only:", command.dmOnly.toString()[0].toUpperCase() + command.dmOnly.toString().substr(1));
            embed.setTimestamp()
        message.channel.send(embed);

    },
}
