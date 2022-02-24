import Eris, { CommandInteraction } from 'eris';

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
  }
};
