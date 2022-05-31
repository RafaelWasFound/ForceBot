import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { ColorResolvable, CommandInteraction, PermissionResolvable } from 'discord.js';

import logger from '../../logger';
import CommandOptions from '../../types/CommandOptions';
import colors from '../../utils/colors.json';
import emojis from '../../utils/emojis.json';
import ForceClient from '../ForceClient';
import CommandContext from './CommandContext';

export default abstract class Command {
  private name: string;
  private data: SlashCommandBuilder;
  private botRequiredPermissions: PermissionResolvable[];
  private userRequiredPermissions: PermissionResolvable[];
  private client: ForceClient;

  protected logger: typeof logger;

  constructor(options: CommandOptions, client: ForceClient) {
    this.name = options.name;
    this.data = options.data;
    this.botRequiredPermissions = options.botRequiredPermissions ?? [];
    this.userRequiredPermissions = options.userRequiredPermissions ?? [];
    this.client = client;

    this.logger = logger;
  }

  public getName(): string {
    return this.data.name;
  }

  public getData(): RESTPostAPIApplicationCommandsJSONBody {
    return this.data.toJSON();
  }

  public getRequiredPermissions(type: 'bot' | 'user'): PermissionResolvable[] {
    return type === 'bot' ? this.botRequiredPermissions : this.userRequiredPermissions;
  }

  public checkRequiredPermissions(type: 'bot' | 'user', interaction: CommandInteraction<'cached'>): boolean | void {
    return interaction.channel
      ?.permissionsFor(type === 'bot' ? this.client.user.id : interaction.user.id)
      ?.has(this.getRequiredPermissions(type));
  }

  public getMissingPermissions(
    type: 'bot' | 'user',
    interaction: CommandInteraction<'cached'>
  ): PermissionResolvable[] {
    if (this.checkRequiredPermissions(type, interaction)) return [];

    return this.getRequiredPermissions(type).filter(
      (permission) => !interaction.channel?.permissionsFor(interaction.user.id)?.has(permission)
    );
  }

  public checkRequirements(): boolean {
    if (!this.name ?? !this.data ?? !this.run) return false;
    return true;
  }

  protected getColor(color: keyof typeof colors): ColorResolvable {
    return colors[color] as ColorResolvable;
  }

  protected getEmoji(emoji: keyof typeof emojis): string {
    return emojis[emoji];
  }

  public abstract run(context: CommandContext): unknown;
}
