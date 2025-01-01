import { ClientEvents } from "discord.js";

export class EventController<K extends keyof ClientEvents> {
  constructor(
    public event: K,
    public listener: (...args: ClientEvents[K]) => unknown,
  ) {}
}
