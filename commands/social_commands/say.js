module.exports = {
    name: "say",
    description: "Make the bot say something",
    category: "Social",
    usage: "<text>",
    execute (message, args) {
      message.channel.send(args);
    },
  }
