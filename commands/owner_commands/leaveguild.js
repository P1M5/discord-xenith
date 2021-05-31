module.exports = {
    name: "leaveguild",
    description: "Leaves a guild",
    args: true,
    usage: "[guild id]",
    ownerOnly: true,
    aliases: ["guildleave","gleave","leaveg","serverleave","leaveserver","lg"],
    category: "Owner",
    execute (message, args) {
        if (isNaN(args[0])) {message.channel.send("Please provide a valid guild id")} else {
            try {
                message.client.guilds.cache.get(args[0]).leave();
                message.channel.send(":ok_hand:");
            } catch (err) {
                message.channel.send(`Error when attempting to leave guild with id \`${args[0]}\``)
            }
        }
    },
}