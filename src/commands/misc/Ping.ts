import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

import ForceClient from '../../structures/ForceClient';
import Command from '../../structures/command/Command';
import CommandContext from '../../structures/command/CommandContext';

export default class Ping extends Command {
  constructor(client: ForceClient) {
    super(
      {
        name: 'ping',
        data: new SlashCommandBuilder().setName('ping').setDescription('Shows information about bot latency 🏓'),
        botRequiredPermissions: ['EMBED_LINKS'],
      },
      client
    );
  }

  public async run(context: CommandContext): Promise<void> {
    const embed = new MessageEmbed()
      .setColor(this.getColor('red'))
      .setTitle(`${this.getEmoji('pong')} Pong!`)
      .setDescription(
        `**Response Latency**: ${Date.now() - context.interaction.createdTimestamp}ms\n**Gateway Latency**: ${
          context.client.ws.ping
        }ms`
      );

    context.interaction.reply({
      embeds: [embed],
    });
  }
}
