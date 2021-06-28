const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");

/**
@static
@description Executes javascript code and returns result
@extends BasicCommand

@todo Turn it into an constructor from static
 */
class Eval extends BasicCommand {
	static name = "eval";
	static aliases = new Set(["run", "evaluate"]);
	static description = "Executes javascript code and returns result";
	static category = "Owner";
	static usage = "<code>";
	static args = true;
	static ownerOnly = true;

	static execute(msgToken) {

		let resultString;
		if (msgToken.message.author.id === process.env.owner_id) {
			let toEval = msgToken.args.replace("eval ", "");
			if (toEval.startsWith("```js") && toEval.endsWith("```")) {toEval = toEval.substring(6, toEval.length - 3);}
			else if (toEval.startsWith("```") && toEval.endsWith("```")) {toEval = toEval.substring(4, toEval.length - 3);}
			try {
				let evalFun;
				if (toEval.split("\n").length === 1) {
					evalFun = eval(`() => ${toEval}`);
				}
				else {
					evalFun = eval(`() => { ${toEval} }`);
				}
				const beforeFun = process.hrtime();
				const res = evalFun();
				const took = process.hrtime(beforeFun);
				resultString = `*Execution took: ${took[0]}s and ${took[1]}ns*
\`\`\`js
${res}
\`\`\``;
			}
			catch (error) {
				console.error(error);
			}
			msgToken.message.channel.send(resultString)
				.catch((error) => {
					msgToken.message.channel.send(`Caught exception: \`${error.message} (${error.name})\``);
					console.error(error);
				});
		}
	}
}

module.exports = Eval;
