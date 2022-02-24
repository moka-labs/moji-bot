import Eris from 'eris';

export const commands = async (client: Eris.Client) => {
  await Promise.all([
    client.createCommand({
      name: 'invite',
      description: 'get invite url',
      type: 1,
      defaultPermission: true
    })
  ]);
}
