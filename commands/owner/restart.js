const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");

module.exports = class Restart extends BasicCommand {
    static name = "restart";
    static description = "Restarts the bot";
    static ownerOnly = true;
    static execute (msgToken) {
        msgToken.message.react("👌").then(msg =>
        process.exit())
        .catch(e =>
        console.error(e));
    }
}
