module.exports = {
	name: "ban",
	description: "Ban a user",
	aliases: new Set(["hammer", "banhammer"]),
	category: "Moderation",
	usage: "<user id or mention><reason><duration (defaults to indefinite)>[reason <user id>][providereason <userid>][from <role name><reason>]",
	args: true,
	execute(message, args) {

	},
};
