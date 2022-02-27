import { Client, CommandInteraction, InteractionDataOptionsInteger } from 'eris';

export async function rollCommand(client: Client, command: CommandInteraction) {
  const options = (command.data.options ?? []) as InteractionDataOptionsInteger[];
  const min = options.find(opt => opt.name === 'min')?.value ?? 0;
  let max = options.find(opt => opt.name === 'max')?.value ?? min + 100;
  if (min > max) max = min + 100;
  await command.createMessage('🎲 **' + (Math.floor(Math.random() * (max - min + 1)) + min) + '**');
}
