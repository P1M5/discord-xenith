const ReactionCenter = require("../reactionManager/ReactionCenter.js");
const { MessageEmbed } = require("discord.js");

class Reaction {
    static name = "messageReactionAdd";

    /**
    * If reaction is added, check if message exists in reaction center, and then
    * send the reaction to the command.
    */
    static async execute(reaction, user) {

        if (user.bot) return;

        if (reaction.partial) {
            reaction = await reaction.fetch();
        }

        console.log(reaction.me);

        const msgObj = ReactionCenter.getMessage(reaction.message.id);

        if (!msgObj) return;

        if (user.id != msgObj.userid) return;

        msgObj.command.userReaction(msgObj, reaction);
        ReactionCenter.updateMessage(msgObj, reaction);

    }

}

module.exports = Reaction;
