import { Client, CommandInteraction, InteractionDataOptionsBoolean } from 'eris';

export async function pickCommand(client: Client, command: CommandInteraction) {
  const options = (command.data.options ?? []) as InteractionDataOptionsBoolean[];
  const mention = options.find(opt => opt.name === 'mention')?.value ?? false;
  const user = command.user || command.member;

  let message: string | undefined;
  if (user) {
    message = user.username;
    if (mention) message = user.mention;

    if (command.guildID && command.member?.guild) {
      const guild = command.member.guild;
      const members = await guild.fetchMembers();
      const member = members[Math.floor(Math.random() * members.length)];

      if (member) {
        message = member.username;
        if (mention) message = member.mention;
      }
    }
  }

  if (message) {
    await command.createMessage('🎲 **' + message + '**');
  } else {
    await command.createMessage('🚫 **No members found.**');
  }
}
