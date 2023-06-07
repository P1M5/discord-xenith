<h1> Project Xenith </h1>
Not just an average Discord bot.

## The bot in action

![](https://github.com/P1M5/discord-xenith/blob/margin/example1.gif)
![](https://github.com/P1M5/discord-xenith/blob/margin/example2.gif)

## Prerequisites
NodeJs is needed to run the code

## .env file

To use this project you will need to create a `.env` file in the highest level directory with the following information (all values must be of `STRING` type).

1. `BOT_TOKEN` - the discord bot token
2. `owner_id` - the id of the owner
3. `prefix` - the prefix for each command

### Example
```
  BOT_TOKEN = "your.auth.token.here"
  owner_id = "youDiscordUserId"
  prefix = ">"
```
## Start
1. Clone or download the project.
2. Open a terminal in the project directory.
3.  If this is your first time running this bot, run the `npm install` command to install the dependencies.
4. Run `npm run start` command to start the bot

__Developers Notes:__ Use the `npm run dev`(starts the bot using `nodemon`) command for debugging and `npm run start` (starts it using `node`) for any other launch. `Nodemon` is part of the dependencies so it should already be installed. It will speed up the development process because you will not need to restart the bot after every edit.


## Invite

You should also consider editing the [invite command's](https://github.com/P1M5/discord-xenith/blob/main/commands/General/invite.js) links
