import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config';

// this command is to simulate
const command = new SlashCommandBuilder().setName('test').setDescription('A command for tests!').toJSON();

test('posting commands on discord api', () => {
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN as string);
  rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
    body: [command],
  });
});
