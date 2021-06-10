const { MessageEmbed } = require("discord.js");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");


/**
@static
@description
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Invite extends BasicCommand {
    static name = "invite";
    static description = "Invite command";
    static category = "General";

    static execute (msgToken) {
        const embed = new MessageEmbed()
            .setTitle("Invite")
            .setColor("DARK_BLUE")
            .setDescription("Join the support server to ask questions, report bugs and meet an awesome community or use the bot invite link to invite the bot to your server!")
            .addFields(
                {name: "Support Server Invite", value: "[Join the server](https://discord.gg/VbKNuUd49M)"},
                {name: "Bot Invite", value: "[Invite the bot](https://discord.com/api/oauth2/authorize?client_id=453517745611341826&permissions=470674551&scope=bot)"},
            )
            .setTimestamp()
            msgToken.message.channel.send(embed);
    }
}

module.exports = Invite;
