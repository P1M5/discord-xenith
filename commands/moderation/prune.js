const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");
const { Collection } = require("discord.js");
const debug = require("debug")("DB");

class Prune extends BasicCommand {

    static name = "prune";
    static description = "Prune amount of messages";
    static aliases =  new Set(["purge","clean"]);
    static category = "Moderation";
    static usage = "<amount (defaults to 1)>";
    static args = true;
    static cat = new Collection();

    static execute (msgToken) {

    }


module.exports = Prune;
