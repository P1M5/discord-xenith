const ReactionCenter = require("../reactionManager/reactionCenter.js");
const { MessageEmbed } = require("discord.js");

class Reaction {
    static id = "messageReactionAdd";

    /**
    * If reaction is added, check if message exists in reaction center, and then
    * send the reaction to the command.
    */
    static async execute(reaction, user) {

        if (user.bot) return;

        if (reaction.partial) {
            reaction = await reaction.fetch();
        }

        const msgObj = ReactionCenter.getMessage(reaction.message.id);

        if (!msgObj) return;

        if (user.id != msgObj.userid) return reaction.users.remove(user.id);

        reaction.users.remove(user.id);
        msgObj.command.userReaction(msgObj, reaction);
        ReactionCenter.updateMessage(msgObj, reaction);

    }

}

module.exports = Reaction;
