import 'dotenv/config';
import Eris  from 'eris';
import { readyHandler } from './handlers/ready';
import { messageCreateHandler } from './handlers/message-create';
import { interactionCreateHandler } from './handlers/interaction-create';

export const app = async () => {
  const client = new Eris.Client(process.env.BOT_TOKEN ?? '', { intents: ['guilds', 'guildMembers']});

  client.on('ready', () => readyHandler(client));
  client.on('messageCreate', (msg) => messageCreateHandler(client, msg));
  client.on('interactionCreate', (interaction) => interactionCreateHandler(client, interaction));

  await client.connect();
  return client;
};
