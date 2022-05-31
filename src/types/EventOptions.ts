import { ClientEvents } from 'discord.js';

export default interface EventOptions {
  name: keyof ClientEvents;
}
