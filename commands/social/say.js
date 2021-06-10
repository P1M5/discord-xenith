const { BasicCommand } = require("../.././commands.js");

module.exports = class Say extends BasicCommand {
    static name = "say";
    static description = "Make the bot say something";
    static category = "Social";
    static usage = "<text>";
    static args = true;
    static execute (message, args) {
      message.channel.send(args.join(" "));
    }
  }
