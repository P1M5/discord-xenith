module.exports = {
  name: "guildCreate",
  execute (guild) {
    const client = guild.client;
    console.log(`Added to guild ${guild.name}(${guild.id})[${guild.memberCount} member/s]`);
    const servers = client.guilds.cache;
    const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
    client.user.setActivity(`over ${servers.size} server/s and ${membersNum} member/s`, {type: "WATCHING"});
  }
}
