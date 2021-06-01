module.exports = {
  name: "ready",
  once: true,
  execute (client) {

    const servers = client.guilds.cache;
    const membersNum = servers.reduce((x, y) => x + y.memberCount, 0);
    client.user.setActivity(`over ${servers.size} server/s and ${membersNum} member/s`, {type: "WATCHING"});
  }
}
