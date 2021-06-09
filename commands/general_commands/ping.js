const { BasicCommand } = require("../.././commands.js");

module.exports = class Ping extends BasicCommand {
    static name = "ping";
    static description = "Ping command";
    static aliases = new Set(["bing", "helo", "oi"]);
    static category = "General";

    static execute (message) {
        message.channel.send(`Ping is ${message.client.ws.ping} ms`)
    }
}
