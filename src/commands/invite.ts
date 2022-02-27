import { Client, CommandInteraction } from 'eris';

export async function inviteCommand(client: Client, command: CommandInteraction) {
  const description = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=292057786368&scope=applications.commands%20bot`;
  await command.createMessage({
    embeds: [{
      color: 0xFCC21B,
      description,
    }]
  });
}
