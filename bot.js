const { Client, Intents, Collection } = require("discord.js");
const dotenv = require("dotenv").config();
const fileutils = require("./utils/fileutils.js");


class Setup {

    #client;

    constructor() {
    	const botIntents = new Intents(Intents.NON_PRIVILEGED);

    	this.#client = new Client({ ws: { intents: [ botIntents, "GUILD_MEMBERS"] } });
    	this.#client.commands = new Collection();


    	this.initCommands();
    	this.initEventListeners();
    	this.#client.login(process.env.BOT_TOKEN);
    }


    initCommands() {
    	const paths = fileutils.filePaths("./commands").filter(file => file.endsWith(".js"));

    	for (const path of paths) {
    		const command = require(path);
    		this.#client.commands.set(command.name, command);
    	}

    }


    initEventListeners() {
    	const eventPaths = fileutils.filePaths("./eventHandlers").filter(file => file.endsWith(".js"));

    	for (const path of eventPaths) {
    		const event = require(path);

    		this.#client.on(event.name, (...args) => event.execute(...args, this.#client));
    	}

    }


    get getClient() {
    	return this.#client();
    }

}

new Setup();
