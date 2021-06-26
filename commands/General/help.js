const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");
const ReactionCenter = require("../../reactionManager/ReactionCenter.js");



/**
@static
@description Displays a list of all commands
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Help extends BasicCommand {
    static name = "help";
    static description = "Displays all commands or gives information about a specific command";
    static aliases = new Set(["commands", "cmds", "?"]);
    static usage = "[command name]";
    static category = "General";

    static execute(msgToken) {

    	const { commands } = msgToken.message.client;
    	const ping = msgToken.message.client.ws.ping;

        const userid = msgToken.message.author.id;

        const helpmsg = ["Page 1", "Page 2", "Page 3", "Page 4"];

        const commandObj = {
            page: 0,
            maxPage: helpmsg.length - 1,
            message: helpmsg,
            content: helpmsg[0]
        }

        const reactions = ["◀️","▶️"]

        ReactionCenter.initializeNewMessage(userid, msgToken.message.channel, commandObj, reactions, this);

    	// if (!msgToken.args) {
        //
    	// 	commands.filter(Boolean);
    	// 	const ai_com = commands.filter(command => command.category === "AI").map(command => command.name).join(", ");
    	// 	const card_com = commands.filter(command => command.category === "Cardcord").map(command => command.name).join(", ");
    	// 	const extra_com = commands.filter(command => command.category === "Extra").map(command => command.name).join(", ");
    	// 	const fun_com = commands.filter(command => command.category === "Fun").map(command => command.name).join(", ");
    	// 	const gen_com = commands.filter(command => command.category === "General").map(command => command.name).join(", ");
    	// 	const info_com = commands.filter(command => command.category === "Informative").map(command => command.name).join(", ");
    	// 	const mod_com = commands.filter(command => command.category === "Moderation").map(command => command.name).join(", ");
    	// 	const owner_com = commands.filter(command => command.category === "Owner").map(command => command.name).join(", ");
    	// 	const social_com = commands.filter(command => command.category === "Social").map(command => command.name).join(", ");
        //
    	// 	const embed = new MessageEmbed()
    	// 		.setTitle("Commands List")
    	// 		.setColor("DARK_GREEN")
    	// 	    .setFooter(`To find more about a specific command use ${config.prefix}help <command name> | ${ping} ms`)
    	// 		.setTimestamp();
    	// 	if(gen_com) embed.addField("General Commands", gen_com);
    	// 	if(info_com) embed.addField("Informative Commands", info_com);
    	// 	if(extra_com) embed.addField("Extra Commands", extra_com);
    	// 	if(mod_com) embed.addField("Moderation Commands", mod_com);
    	// 	if(owner_com && msgToken.message.author.id == config.owner_id) embed.addField("Owner Commands", owner_com);
    	// 	if(fun_com) embed.addField("Fun Commands", fun_com);
    	// 	if(card_com) embed.addField("Cardcord Commands", card_com);
    	// 	if(ai_com) embed.addField("AI Commands", ai_com);
    	// 	if(social_com) embed.addField("Social Commands", social_com);
    	// 	return msgToken.message.channel.send(embed);
    	// }
        //
    	// const name = msgToken.args.trim().toLowerCase();
    	// const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.has(name));
        // console.log(command);
    	// if (!command) {
    	// 	return msgToken.message.reply("That's not a valid command");
    	// }
        //
    	// if (command.ownerOnly && msgToken.author.id !== config.owner_id) return;
        //
    	// const embed = new MessageEmbed()
    	// 	.setTitle(command.getName())
    	// 	.setColor("DARK_GREEN")
    	// 	.setTimestamp()
    	// 	.setFooter(`${ping} ms`);
    	// (command.getAliases()) && embed.addField("Aliases:", command.getAliases().join(", "));
    	// (command.getDescription()) && embed.addField("Description:", command.description);
    	// (command.getUsage()) && embed.addField("Usage:", command.usage);
    	// (command.getCooldown()) && embed.addField("Cooldown:", `${command.cooldown} seconds`);
    	// (command.getGuildOnly()) && embed.addField("Guild Only:", command.guildOnly.toString()[0].toUpperCase() + command.guildOnly.toString().substr(1));
    	// (command.getDmOnly()) && embed.addField("DM Only:", command.dmOnly.toString()[0].toUpperCase() + command.dmOnly.toString().substr(1));
    	// (command.args) && embed.addField("Required arguments:", command.args.toString()[0].toUpperCase() + command.args.toString().substr(1));
    	// msgToken.message.channel.send(embed);
    }

    static userReaction(messageObj, reaction) {
        const emojo = reaction.emoji.toString();
        if (emojo == "◀️" && messageObj.commandObject.page > 0) {
            messageObj.commandObject.page -= 1;
        }

        if (emojo == "▶️" && messageObj.commandObject.page < messageObj.commandObject.maxPage) {
            messageObj.commandObject.page += 1;
        }

        messageObj.commandObject.content = messageObj.commandObject.message[messageObj.commandObject.page];
    }
}

module.exports = Help;
