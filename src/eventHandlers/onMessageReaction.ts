import ReactionCenter from "../reactionManager/reactionCenter.js";
import { MessageReaction, User } from "discord.js";

class Reaction {
    static id = "messageReactionAdd";

    /**
    * If reaction is added, check if message exists in reaction center, and then
    * send the reaction to the command.
    */
    static async execute(reaction: MessageReaction, user: User): Promise<void> {

        if (user.bot) return;

        if (reaction.partial) {
            reaction = await reaction.fetch();
        }

        const msgObj = ReactionCenter.getMessage(reaction.message.id);

        if (!msgObj) return;

        if (user.id != msgObj.userid) {
            reaction.users.remove(user.id);
            return;
        }

        reaction.users.remove(user.id);
        msgObj.command.userReaction(msgObj, reaction);
        ReactionCenter.updateMessage(msgObj, reaction);

    }

}

module.exports = Reaction;
