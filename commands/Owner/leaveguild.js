const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");

/**
@static
@description Leaves a guild
@extends BasicCommand

@todo Turn it into an constructor from static
 */
class Leaveguild extends BasicCommand {
	static name = "leaveguild";
	static description = "Leaves a guild";
	static args = true;
	static usage = "[guild id]";
	static ownerOnly = true;
	static aliases = new Set(["guildleave", "gleave", "leaveg", "serverleave", "leaveserver", "lg"]);
	static category = "Owner";

	static execute(message, args) {

		message.client.guilds.fetch(args, false)
			.then(guild => {
				guild.leave()
					.then(() =>
						message.react("👌"))
					.catch(e => console.error(`Error when leaving guild with id ${guild.id}, args: ${args}, error ${e.message}`));
			})
			.catch(e => {message.channel.send(`Error when attmepting to leave guild with id \`${args}\``); console.error(`Caught exception: ${e.message}`);});
	}
}

module.exports = Leaveguild;
