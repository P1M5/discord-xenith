module.exports = {
    name: "ping",
    description: "Ping command",
    aliases: new Set(["bing", "helo", "oi"]),
    category: "General",
    execute (message) {
        message.channel.send(`Ping is ${message.client.ws.ping} ms`)
    },
}
