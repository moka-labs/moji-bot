import Eris, { CommandInteraction, InteractionDataOptionsInteger } from 'eris';

export const interactionCreateHandler = async (client: Eris.Client, interaction: Eris.Interaction) => {
  if (!(interaction instanceof CommandInteraction)) {
    return;
  }

  const command = interaction as CommandInteraction;
  if (command.data.name === 'invite') {
    const description = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=274877918208&scope=applications.commands%20bot`;
    await command.createMessage({
      embeds: [{
        color: 0xFCC21B,
        description,
      }]
    });
  } else if (command.data.name === 'roll') {
    const options = (command.data.options ?? []) as InteractionDataOptionsInteger[];
    const min = options.find(opt => opt.name === 'min')?.value ?? 0;
    let max = options.find(opt => opt.name === 'max')?.value ?? min + 100;
    if (min > max) max = min + 100;
    await command.createMessage('🎲 **' + (Math.floor(Math.random() * (max - min + 1)) + min) + '**');
  }
};
