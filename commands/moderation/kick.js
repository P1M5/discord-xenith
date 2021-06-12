const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");
const debug = require("debug")("DB");


class Kick extends BasicCommand {

    static name = "kick";
    static description = "Kick a user";
    static category = "Moderation";
    static usage = "<user id or mention><reason><duration (defaults to indefinite)>,[reason <user id>],[providereason <userid>]";
    static args = true;

    static execute (msgToken) {

}


module.exports = Kick;
