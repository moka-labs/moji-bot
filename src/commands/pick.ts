import { Client, CommandInteraction } from 'eris';

export async function pickCommand(client: Client, command: CommandInteraction) {
  if (command.guildID && command.member?.guild) {
    const guild = command.member.guild;
    const member = guild.members.random();

    if (member) {
      await command.createMessage('🎲 **' + member.mention + '**');
    } else {
      await command.createMessage('🚫 **No members found.**');
    }
  } else {
    await command.createMessage({
      embeds: [{
        color: 0xFF0000,
        title: '🚫 ERROR',
        description: 'This command is only available in guilds.',
      }]
    });
  }
}
