import { CommandInteraction } from 'discord.js';

import ForceClient from '../ForceClient';
import Command from './Command';

export default class CommandContext {
  public client: ForceClient;
  public interaction: CommandInteraction<'cached'>;
  public command: Command;

  constructor(client: ForceClient, interaction: CommandInteraction<'cached'>, command: Command) {
    this.client = client;
    this.interaction = interaction;
    this.command = command;
  }
}
