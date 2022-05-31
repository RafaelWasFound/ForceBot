import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class Ready extends Event {
  constructor() {
    super({
      name: 'ready',
    });
  }

  public run(client: ForceClient): void {
    const commandsInJSON = client.commands.toJSON().map((command) => command.getData());

    new REST({ version: '9' })
      .setToken(process.env.TOKEN as string)
      .put(Routes.applicationCommands(client.user.id), {
        body: commandsInJSON,
      })
      .then(() =>
        this.logger.info(`Registered ${commandsInJSON.length} ${commandsInJSON.length === 1 ? 'command' : 'commands'}.`)
      );

    this.logger.info('All shards have been connected.');
  }
}
