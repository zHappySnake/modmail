import { Client, ClientEvents, Events } from "discord.js";
import { BaseEvent } from "./BaseEvent";

class ReadyEvent extends BaseEvent {
	constructor() {
		super(Events.ClientReady as keyof ClientEvents, true);
	}

	async execute(readyClient: Client) {
		if (!readyClient.user) return;
		console.log(`Ready and logged in as ${readyClient.user.tag}`);
	}
}

export default new ReadyEvent();
