import { Client as Base, ClientOptions, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import mongoose from 'mongoose';
import path from 'path';

import logger from '../logger';
import Command from './command/Command';

export default class ForceClient extends Base<true> {
  public commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }

  public async run(token: string): Promise<void> {
    await this.connectToDatabase();
    this.loadCommands(process.env.NODE_ENV === 'production' ? './dist/commands/' : './src/commands/');
    this.loadEvents(process.env.NODE_ENV === 'production' ? './dist/events/' : './src/events/');
    super.login(token);
  }

  public loadCommands(directory: string): void {
    readdirSync(directory).forEach((folder) => {
      readdirSync(path.join(directory, folder)).forEach(async (file) => {
        const command = new // eslint-disable-next-line new-cap
        (await import(path.resolve(directory, folder, file))).default(this);

        if (!command.checkRequirements()) return;
        this.commands.set(command.getName(), command);
      });
    });
  }

  public loadEvents(directory: string): void {
    readdirSync(directory).forEach((folder) => {
      readdirSync(path.join(directory, folder)).forEach(async (file) => {
        const event = new // eslint-disable-next-line new-cap
        (await import(path.resolve(directory, folder, file))).default();

        if (!event.checkRequirements()) return;
        this.on(event.getName(), (...args) => event.run(this, ...args));
      });
    });
  }

  public async connectToDatabase(): Promise<void> {
    mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => logger.info('Connected to the database.'))
      .catch(logger.error);
  }
}
