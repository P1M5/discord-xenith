module.exports = {
    name: "module",
    description: "Enable or disable modules",
    aliases: new Set(["category"]),
    category: "Owner",
    usage: "[enable <module name>],[disable <module name>]",
    args: true,
    ownerOnly: true,
    execute (message, args) {

    },
  }
