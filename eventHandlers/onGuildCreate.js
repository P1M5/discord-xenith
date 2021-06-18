module.exports = {
	name: "guildCreate",
	execute(guild, client) {

		console.log(`Added to guild ${guild.name}(${guild.id})[${guild.memberCount} member/s]`);
		const servers = client.guilds.cache;
		const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
		let ms, ss; ms = ss = "";
		if(membersNum > 1) ms = "s";
		if(servers.size > 1) ss = "s";
		client.user.setActivity(`over ${servers.size} server${ss} and ${membersNum} member${ms}`, { type: "WATCHING" });
	},
};
