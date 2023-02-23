import Eris from 'eris';
import { commands } from '../commands';

export const readyHandler = async (client: Eris.Client) => {
  process.send?.('ready');

  await commands(client);
  client.editStatus('online', { name: 'big emotes', type: 0 });
  console.info('ready!');
};
