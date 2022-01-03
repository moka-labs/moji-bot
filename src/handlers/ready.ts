import Eris from 'eris';

export const readyHandler = async (client: Eris.Client) => {
  process.send?.('ready');
  client.editStatus('online', { name: 'big emotes', type: 0 });
};
