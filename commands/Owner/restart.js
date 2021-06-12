const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");

module.exports = class Restart extends BasicCommand {
    static name = "restart";
    static description = "Restarts the bot";
    static ownerOnly = true;
<<<<<<< HEAD:commands/Owner/restart.js
    static execute(msgToken) {

    	msgToken.message.react("👌").then(() =>
    		process.exit())
    		.catch(e =>
    			console.error(e));
=======
    static execute (msgToken) {
        msgToken.message.react("👌").then(msg =>
        process.exit())
        .catch(e =>
        console.error(e));
>>>>>>> e89ad83643580747de6feb9eee714f07f67ab787:commands/owner/restart.js
    }
};
