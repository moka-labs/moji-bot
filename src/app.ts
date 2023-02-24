import 'dotenv/config';
import Eris from 'eris';
import { interactionCreateHandler } from './handlers/interaction-create';
import { messageCreateHandler } from './handlers/message-create';
import { readyHandler } from './handlers/ready';
import { shardReadyHandler } from './handlers/shard-ready';

export const app = async () => {
  const client = new Eris.Client(process.env.BOT_TOKEN ?? '', { intents: ['guilds', 'guildMembers', 'guildMessages', 'guildMessageReactions', 'directMessages', 'directMessageReactions'] });

  client.on('ready', () => readyHandler(client));
  client.on('messageCreate', (msg) => messageCreateHandler(client, msg));
  client.on('interactionCreate', (interaction) => interactionCreateHandler(client, interaction));
  client.on('shardReady', (id) => shardReadyHandler(client, id));

  await client.connect();
  return client;
};
