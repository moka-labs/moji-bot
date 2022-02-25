import Eris, { Constants } from 'eris';

export const commands = async (client: Eris.Client) => {
  await Promise.all([
    client.createCommand({
      name: 'invite',
      description: 'Receive bot invite url',
      type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
      defaultPermission: true
    }),
    client.createCommand({
      name: 'roll',
      description: 'Get random number!',
      type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
      defaultPermission: true,
      options: [
        { name: 'min', type: Constants.ApplicationCommandOptionTypes.INTEGER, description: 'min value' },
        { name: 'max', type: Constants.ApplicationCommandOptionTypes.INTEGER, description: 'max value' }
      ]
    }),
  ]);
};
