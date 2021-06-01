module.exports = {
  name: "guildDelete",
  execute (guild, client) {

    console.log(`Removed from guild ${guild.name}(${guild.id})[${guild.memberCount} members]`);
    const servers = client.guilds.cache;
    const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
    client.user.setActivity(`over ${servers.size} servers and ${membersNum} members`, {type: "WATCHING"});
  }
}
