import { Client, Intents, Collection } from "discord.js";
import { Bot } from "./abstractClasses/interfaces";
import config from "./config/config.json";
import fileutils from "./utils/fileutils.js";

class Setup {

    #client: Bot;

    constructor() {
    	const botIntents = new Intents(Intents.NON_PRIVILEGED);

    	this.#client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], ws: { intents: [ botIntents, "GUILD_MEMBERS"] } }) as Bot;
        this.#client.commands = new Collection();

    	this.initCommands();
    	this.initEventListeners();
    	this.#client.login(config.BOT_TOKEN);
    }


    initCommands() {
    	const paths: string[] = fileutils.filePaths(__dirname + "/commands").filter((file: string) => file.endsWith(".js"));

    	for (const path of paths) {
    		const command = require(path);
    		this.#client.commands.set(command.id, command);
    	}

    }


    initEventListeners() {
    	const eventPaths = fileutils.filePaths(__dirname + "/eventHandlers").filter((file: string) => file.endsWith(".js"));

    	for (const path of eventPaths) {
    		const event = require(path);

    		this.#client.on(event.id, (...args: object[]) => event.execute(...args, this.#client));
    	}

    }


    get getClient(): Bot {
    	return this.#client;
    }

}

new Setup();
