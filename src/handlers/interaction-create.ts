import Eris, { CommandInteraction } from 'eris';

import { githubCommand } from '../commands/github';
import { inviteCommand } from '../commands/invite';
import { pickCommand } from '../commands/pick';
import { randomCommand } from '../commands/random';
import { rollCommand } from '../commands/roll';
import { statusCommand } from '../commands/status';

export const interactionCreateHandler = async (client: Eris.Client, interaction: Eris.Interaction) => {
  if (!(interaction instanceof CommandInteraction)) {
    return;
  }

  try {
    const command = interaction as CommandInteraction;
    switch (command.data.name) {
      case 'invite':
        await inviteCommand(client, command);
        break;
      case 'roll':
        await rollCommand(client, command);
        break;
      case 'random':
        await randomCommand(client, command);
        break;
      case 'pick':
        await pickCommand(client, command);
        break;
      case 'github':
        await githubCommand(client, command);
        break;
      case 'status':
        await statusCommand(client, command);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
