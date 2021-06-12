const fs = require("fs");
const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");

module.exports = class Reload extends BasicCommand {
    static name = "reload";
    static description = "Reload a command";
    static category = "Owner";
    static args = true;
    static usage = "<command name>";
    static ownerOnly = true;
    static execute (msgToken) {
        const commandName = msgToken.args.toLowerCase();
        const command = msgToken.message.client.commands.get(commandName)
           || msgToken.message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

           if(!command) {
             return msgToken.message.channel.send(`The command ${commandName} you requested was not found`)
           }

           const commandFolders = fs.readdirSync("./commands");
           const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

           delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

           try {
             const newCommand = require(`../${folderName}/${command.name}.js`);
             msgToken.message.client.commands.set(newCommand.name, newCommand);
             msgToken.message.channel.send(`Command \`${newCommand.name}\` was reloaded successfully`);
           } catch (e) {
             console.error(e);
             msgToken.message.channel.send(`There was an error while trying to reaload the command \`${command.name}\`:\n${error.message}`);
           }
    }
}
