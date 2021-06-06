const { Client, Intents, Collection } = require("discord.js");
const { BOT_TOKEN } = require("./config.json");
const fs = require("fs");

const botIntents = new Intents(Intents.NON_PRIVILEGED);
const client = new Client({ ws: { intents: [ botIntents, "GUILD_MEMBERS"] } });

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

client.commands = new Collection();
client.cooldowns = new Collection();
const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(BOT_TOKEN);
