import { ClientEvents } from "discord.js";

export abstract class BaseEvent {
	constructor(public name: keyof ClientEvents, public once: boolean = false) {}

	abstract execute(...args: any[]): void;
}
