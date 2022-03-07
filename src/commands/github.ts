import { Client, CommandInteraction, Constants } from 'eris';

export async function githubCommand(client: Client, command: CommandInteraction) {
  const githubUrl = 'https://github.com/moka-labs/moji-bot';
  await command.createMessage({
    components: [
      { type: 1, components: [ { type: Constants.ComponentTypes.BUTTON, label: 'Github', url: githubUrl, style: Constants.ButtonStyles.LINK } ] },
    ]
  });
}
