module.exports = {
	name: "guildDelete",
	execute(guild, client) {

		console.log(`Removed from guild ${guild.name}(${guild.id})[${guild.memberCount} member/s]`);
		const servers = client.guilds.cache;
		const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
		let ms, ss; ms = ss = "";
		if(membersNum > 1) ms = "s";
		if(servers.size > 1) ss = "s";
		client.user.setActivity(`over ${servers.size} server${ss} and ${membersNum} member${ms}`, { type: "WATCHING" });
	},
};
