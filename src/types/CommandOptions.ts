import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionResolvable } from 'discord.js';

export default interface CommandOptions {
  name: string;
  data: SlashCommandBuilder;
  botRequiredPermissions?: PermissionResolvable[];
  userRequiredPermissions?: PermissionResolvable[];
}
