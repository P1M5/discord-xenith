module.exports = {
    name: "restart",
    description: "Restarts the bot",
    ownerOnly: true,
    execute () {
      process.exit();
    },
}