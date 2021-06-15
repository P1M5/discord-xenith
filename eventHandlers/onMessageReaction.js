
class Reaction {
    static name = "messageReactionAdd";

    static async execute(reaction, user) {
        
        const token = {
            reaction: null,
            userid: null,
            messageid: null,
            message: null,
            user: user,
            type: "reaction",
            dm: false,
        }

        if (reaction.partial) {
            reaction = await reaction.fetch();
        }

        token.reaction = reaction;
        token.userid = user.id;
        token.message = reaction.message;
        token.messageid = token.message.id;
        token.dm = !(token.message.guild && true) ;
    }

}

module.exports = Reaction;
