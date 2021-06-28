const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");


class Prune extends BasicCommand {

    static id = "prune";
    static description = "Prune amount of messages";
    static aliases = new Set(["purge", "clean"]);
    static category = "Moderation";
    static usage = "<amount (defaults to 1)>";
    static args = true;

    static execute(msgToken) {

    }
}

module.exports = Prune;
