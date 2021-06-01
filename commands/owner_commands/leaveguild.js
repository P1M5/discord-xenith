module.exports = {
    name: "leaveguild",
    description: "Leaves a guild",
    args: true,
    usage: "[guild id]",
    ownerOnly: true,
    aliases: ["guildleave","gleave","leaveg","serverleave","leaveserver","lg"],
    category: "Owner",
    execute (message, args) {
        message.client.guilds.fetch(args, false)
        .then(guild => {
          guild.leave()
          .then(() =>
          message.react("👌"))
          .catch(e => console.error(`Error when leaving guild with id ${guild.id}, args: ${args}, error ${e}`));
        })
        .catch(e => message.channel.send(`Error when attmepting to leave guild with id \`${args}\``));
    },
}
