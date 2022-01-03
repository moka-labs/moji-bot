import 'dotenv/config';
import Eris from 'eris';
import { readyHandler } from './handlers/ready';
import { messageCreateHandler } from './handlers/message-create';

const client = new Eris.Client(process.env.BOT_TOKEN ?? '');

client.on('ready', () => readyHandler(client));
client.on('messageCreate', (msg) => messageCreateHandler(client, msg));

client.connect();
process.on('SIGINT', function() {
  client.disconnect({});
  process.exit(0);
});
