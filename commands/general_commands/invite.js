const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Invite command",
    category: "General",
    execute (message) {
        const embed = new MessageEmbed()
            .setTitle("Invite")
            .setColor("DARK_BLUE")
            .setDescription("Join the support server to ask questions, report bugs and meet an awesome community or use the bot invite link to invite the bot to your server!")
            .addFields(
                {name: "Support Server Invite", value: "[Join the server](https://discord.gg/VbKNuUd49M)"},
        {name: "Bot Invite", value: "[Invite the bot](https://discord.com/api/oauth2/authorize?client_id=453517745611341826&permissions=470674551&scope=bot)"},
            )
            .setTimestamp()
        message.channel.send(embed);
    },
}
