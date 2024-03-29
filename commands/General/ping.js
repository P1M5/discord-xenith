const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");


/**
@static
@description Shows the ping
@extends BasicCommand

@todo Turn it into an constructor from static
*/
class Ping extends BasicCommand {
    static name = "ping";
    static description = "Ping command";
    static aliases = new Set(["bing", "helo", "oi"]);
    static category = "General";

    static execute(msgToken) {
    	msgToken.message.channel.send(`Ping is ${msgToken.message.client.ws.ping} ms`);
    }
}

module.exports = Ping;
