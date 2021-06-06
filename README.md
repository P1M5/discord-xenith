<h1> Project P&lteaBotty&gt </h1>
Not just an average Discord bot.

## Prerequisites
NodeJs is needed to run the code

## Config file

To use this project you will need to create a `config.json` file in the highest level directory with the following information (all values must be of `STRING` type).

1. `BOT_TOKEN` - the discord bot token
2. `owner_id` - the id of the owner
3. `prefix` - the prefix for each command

### Example
```
{
  "BOT_TOKEN": "your.auth.token.here",
  "owner_id": "youDiscordUserId",
  "prefix": ">"
  "bot_version":  "X.X.X" <optionally "X.X.X (version name)">
}
```
## Start
1. Clone or download the project.
2. Open a terminal in the project directory.
3.  If this is your first time running this bot, run the `npm install` command to install the dependencies.
4. Run `node bot.js` command to start the bot

__Developers Notes:__ Use the `nodemon bot.js` command instead of `node bot.js`. It is part of the dependencies so it should already be installed. It will speed up the development process because you will not need to restart the server after every edit.


## Invite

You should also consider editing the [invite command's](https://github.com/P1M5/discord-testBotty/blob/main/commands/general_commands/invite.js) links
