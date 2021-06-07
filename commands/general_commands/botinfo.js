const { MessageEmbed, version, versionName } = require("discord.js");
const { bot_version } = require("../.././config.json");

module.exports = {
    name: "botinfo",
    description: "Info about the bot",
    aliases: new Set(["about","bi","bot"]),
    category: "General",
    execute (message) {
        let seconds = message.client.uptime/1000;
        let days = Math.floor(seconds/86400);
        seconds %= 86400;
        let hours = Math.floor(seconds/3600);
        seconds %= 3600;
        let minutes = Math.floor(seconds/60);
        seconds %= 60;
        seconds = Math.floor(seconds);
        let dateNow = new Date;
        const { createdAt } = message.client.user
        let dateDif = dateNow.getFullYear() - createdAt.getFullYear();
        let dateDifMon = (dateDif * 12) + (dateNow.getMonth() - createdAt.getMonth());
        const servers = message.client.guilds.cache;
        const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
        const dateCreated = new Date(createdAt.getTime())
        const optionsD = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const embed = new MessageEmbed()
            .setTitle("About")
            .setColor("DARK_BLUE")
            .addFields(
                {name: "Serving:", value: `${servers.size} server/s and ${membersNum} member/s`},
                {name: "Bot version:", value: bot_version},
                {name: "Discord.js version:", value: version},
                {name: "Memory Usage:", value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`},
                {name: "Uptime:", value: `Uptime is ${days} d, ${hours} h, ${minutes} m and ${seconds} s`},
                {name: "Ping:", value: `${message.client.ws.ping} ms`},
                {name: "Birthday:", value: `${dateCreated.toLocaleString("en-GB", optionsD)} (${dateDifMon} month/s ago)`},
            )
            .setThumbnail(message.client.user.displayAvatarURL())
            .setTimestamp()
            message.channel.send(embed);
    },
}
