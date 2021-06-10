const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");


/**
@static
@description
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Say extends BasicCommand {
    static name = "say";
    static description = "Make the bot say something";
    static category = "Social";
    static usage = "<text>";
    static args = true;
    static execute (msgToken) {
      msgToken.message.channel.send(msgToken.args);
    }
  }

module.exports = Say;
