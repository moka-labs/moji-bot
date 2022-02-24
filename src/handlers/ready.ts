import Eris from 'eris';
import { commands } from '../commands';

export const readyHandler = async (client: Eris.Client) => {
  process.send?.('ready');

  client.editStatus('offline', { name: 'loading...', type: 0 });
  await commands(client);
  client.editStatus('online', { name: 'big emotes', type: 0 });
  console.info('ready!');
};
