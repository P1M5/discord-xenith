module.exports = {
    name: "ping",
    description: "Ping command",
    category: "General",
    execute (message) {
        message.channel.send(`Ping is ${message.client.ws.ping} ms`)
    },
}