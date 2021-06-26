const { MessageEmbed } = require("discord.js");
const { Collection } = require("discord.js");

class ReactionCenter {

    // Note ot self: Look into await reactions and reaction collectors
    
    static liveMessages = new Collection(); // Message used as key

    /**
    * Creates a new entry in liveMessages with a timeout time (in ms) determined by `timeAlive`
    * parameter.
    * `commandObj` contains all the data the command (that initialized the new message) will need
    * to interact with it.
    * `commandObj` must also contain a `content` property that contains the date
    * that currently needs to be displayed.
    *
    *
    * Potentially use this class to create and update messages
    */
    static async initializeNewMessage(userid, channel, commandObj, reactionList, command, timeAlive = 10000){

        if (!userid || !channel|| !commandObj || !timeAlive || !command  ) {
            throw new Error("One or more arguments were undefined");
        }

        const msgObj = { // Command object must contain a field called `closeFcn`
            userid: userid,
            messageid: null,
            message: null,
            command: command,
            commandObject: commandObj,
            timeAlive: timeAlive,
            timeout: null
        }

        const message = await channel.send(commandObj.content);

        msgObj.message = message;

        reactionList.forEach(reaction => {
            message.react(reaction).catch(reason => console.log(reason));
        });

        msgObj.messageid = message.id;

        this.liveMessages.set(msgObj.messageid, msgObj)

        msgObj.timeout = setTimeout(() => {
            msgObj.message.edit(new MessageEmbed().addField("Query has timed out puss"));
            this.liveMessages.delete(msgObj.messageid);
        }, timeAlive);

    }

    /**
    * Updates the commandObj in `liveMessages` if messageid exists, and resets the timeout.
    * Update the message too.
    */
    static updateMessage(msgObj, reaction) {

        clearTimeout(msgObj.timeout);

        msgObj.message.edit(msgObj.commandObject.content)

        msgObj.timeout = setTimeout(() => {
            msgObj.message.edit(new MessageEmbed().addField("Query has timed out puss"));
            this.liveMessages.delete(msgObj.messageid);
        }, msgObj.timeAlive);
    }


    /**
    * Gets live message using messageid if exists, else returns null
    */
    static getMessage(messageid) {
        return this.liveMessages.get(messageid);
    }

}

module.exports = ReactionCenter
