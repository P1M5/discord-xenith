const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");
const debug = require("debug")("DB");


class Kick extends BasicCommand {

    static name = "kick";
    static description = "Kick a user";
    static category = "Moderation";
    static usage = "<user id or mention><reason><duration (defaults to indefinite)>,[reason <user id>],[providereason <userid>]";
    static args = true;

    static execute (msgToken) {
        debug("start kick");
        const result = msgToken.message.mentions.members.map((item) => {
            // add check for if bot can kick
            if (item.id == msgToken.message.author.id) {
                return item.displayName + ": Do you really wanna ban yourself? -_- Trashhole\n";
            } else if (msgToken.message.member.roles.highest.comparePositionTo(item.roles.highest) <= 0) {
                return item.displayName + ": not enuf perms to kick lmao\n";
            } else {
                return item.displayName + ": 360 No scoped (kickedd)!!!\n";
            }
        })

        msgToken.message.reply(result.join(" "));
        debug("kick end");

    }
}


module.exports = Kick;
