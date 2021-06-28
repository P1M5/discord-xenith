const { Client, Intents, Collection } = require("discord.js");
const config = require("../config/config.json");
const fileutils = require("./utils/fileutils.js");


class Setup {

    #client;

    constructor() {
    	const botIntents = new Intents(Intents.NON_PRIVILEGED);

    	this.#client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], ws: { intents: [ botIntents, "GUILD_MEMBERS"] } });
    	this.#client.commands = new Collection();


    	this.initCommands();
    	this.initEventListeners();
    	this.#client.login(config.BOT_TOKEN);
    }


    initCommands() {
    	const paths = fileutils.filePaths(__dirname + "/commands").filter(file => file.endsWith(".js"));

    	for (const path of paths) {
    		const command = require(path);
    		this.#client.commands.set(command.id, command);
    	}

    }


    initEventListeners() {
    	const eventPaths = fileutils.filePaths(__dirname + "/eventHandlers").filter(file => file.endsWith(".js"));

    	for (const path of eventPaths) {
    		const event = require(path);

    		this.#client.on(event.id, (...args) => event.execute(...args, this.#client));
    	}

    }


    get getClient() {
    	return this.#client();
    }

}

new Setup();
