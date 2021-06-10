module.exports = {
    name: "unblock",
    description: "Unblock a user or a server from using the bot",
    aliases: new Set(["restoreaccess"]),
    category: "Owner",
    usage: "[server <server id>],[user <user id>]",
    args: true,
    ownerOnly: true,
    execute (message, args) {

    },
  }
