const { BasicCommand } = require("../.././commands.js");

module.exports = class Restart extends BasicCommand {
    static name = "restart";
    static description = "Restarts the bot";
    static ownerOnly = true;
    static execute (message) {
        message.react("👌").then(msg =>
        process.exit())
        .catch(e =>
        console.error(e));
    }
}
