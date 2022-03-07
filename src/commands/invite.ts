import { Client, CommandInteraction, Constants } from 'eris';

export async function inviteCommand(client: Client, command: CommandInteraction) {
  const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=292057786368&scope=applications.commands%20bot`;
  await command.createMessage({
    components: [
      { type: 1, components: [ { type: Constants.ComponentTypes.BUTTON, label: 'Invite', url: inviteUrl, style: Constants.ButtonStyles.LINK } ] },
    ]
  });
}
