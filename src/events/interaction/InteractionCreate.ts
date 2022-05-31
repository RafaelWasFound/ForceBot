import { CommandInteraction } from 'discord.js';

import ForceClient from '../../structures/ForceClient';
import CommandContext from '../../structures/command/CommandContext';
import Event from '../../structures/event/Event';
import permissions from '../../utils/permissions.json';

export default class InteractionCreate extends Event {
  constructor() {
    super({
      name: 'interactionCreate',
    });
  }

  public run(client: ForceClient, interaction: CommandInteraction<'cached'>): void | unknown {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const context = new CommandContext(client, interaction, command);

    if (!command.checkRequiredPermissions('bot', interaction)) {
      const missingPermissions = command
        .getMissingPermissions('bot', interaction)
        .map((permission) => permissions[permission as keyof typeof permissions]);

      return interaction.reply(
        `⛄ I need the **${missingPermissions.join(', ')}** ${
          missingPermissions.length === 1 ? 'permission' : 'permissions'
        } to run this command.`
      );
    }

    if (!command.checkRequiredPermissions('user', interaction)) {
      const missingPermissions = command
        .getMissingPermissions('user', interaction)
        .map((permission) => permissions[permission as keyof typeof permissions]);

      return interaction.reply(
        `👮 You need the **${missingPermissions.join(', ')}** ${
          missingPermissions.length === 1 ? 'permission' : 'permissions'
        } to run this command.`
      );
    }

    command.run(context);
  }
}
