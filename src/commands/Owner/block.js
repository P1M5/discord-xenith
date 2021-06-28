module.exports = {
	name: "block",
	description: "Block a user or a server from using the bot",
	aliases: new Set(["denyaccess"]),
	category: "Owner",
	usage: "[server <server id><reason><duration (defaults to indefinite)],[user <user id><reason><duration (defaults to indefinite)],[server providereason <server id>],[user providereason <user id>]",
	args: true,
	ownerOnly: true,
	execute(message, args) {

	},
};
