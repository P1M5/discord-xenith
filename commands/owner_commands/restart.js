module.exports = {
    name: "restart",
    description: "Restarts the bot",
    ownerOnly: true,
    execute (message) {
      message.react("👌").then(msg =>
      process.exit())
      .catch(e =>
      console.error(e));
    },
}
