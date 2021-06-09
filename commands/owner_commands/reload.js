const fs = require("fs");
const { BasicCommand } = require("../.././commands.js");

module.exports = class Reload extends BasicCommand {
    static name = "reload";
    static description = "Reload a command";
    static category = "Owner";
    static args = true;
    static usage = "<command name>";
    static ownerOnly = true;
    static execute (message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
           || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

           if(!command) {
             return message.channel.send(`The command ${commandName} you requested was not found`)
           }

           const commandFolders = fs.readdirSync("./commands");
           const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

           delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

           try {
             const newCommand = require(`../${folderName}/${command.name}.js`);
             message.client.commands.set(newCommand.name, newCommand);
             message.channel.send(`Command \`${newCommand.name}\` was reloaded successfully`);
           } catch (e) {
             console.error(e);
             message.channel.send(`There was an error while trying to reaload the command \`${command.name}\`:\n${error.message}`);
           }
    }
}
