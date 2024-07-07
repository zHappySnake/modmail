import discordjs from "discord.js";
import path from "path";
import fs from "fs";
import { BaseEvent } from "./events/BaseEvent";

const GatewayIntentBits = discordjs.GatewayIntentBits;

class Client {
	public client: discordjs.Client;

	constructor() {
		this.client = new discordjs.Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.DirectMessages,
			],
		});

		this.initEvents();
	}

	private initEvents() {
		const eventsPath = path.resolve(__dirname, "events");

		const eventFiles = fs
			.readdirSync(path.resolve(__dirname, "events"))
			.filter((file) => file.endsWith(".event.js"));

		for (const file of eventFiles) {
			const filePath = path.resolve(eventsPath, file);
			const event: BaseEvent = require(filePath).default;

			if (event.once) {
				this.client.once(event.name, (...args) => event.execute(...args));
			} else {
				this.client.on(event.name, (...args) => event.execute(...args));
			}
		}
	}
}

export default new Client().client;
