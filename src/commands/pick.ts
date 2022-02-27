import { Client, CommandInteraction } from 'eris';

export async function pickCommand(client: Client, command: CommandInteraction) {
  const user = command.user || command.member;

  let message: string | undefined;
  if (user) {
    message = user.username + '#' + user.discriminator;

    if (command.guildID && command.member?.guild) {
      const guild = command.member.guild;
      const members = await guild.fetchMembers();
      const member = members[Math.floor(Math.random() * members.length)];

      if (member) {
        message = member.username + '#' + member.discriminator;
      }
    }
  }

  if (message) {
    await command.createMessage('🎲 **' + message + '**');
  } else {
    await command.createMessage('🚫 **No members found.**');
  }
}
