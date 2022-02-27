import Eris, { Client, CommandInteraction } from 'eris';
import emojis from 'emojis-list';
import { parse } from 'twemoji-parser';

export async function randomCommand(client: Client, command: CommandInteraction) {
  const user = command.member || command.user;
  let url: string | undefined;
  if (Math.random() < .5 && command.guildID && command.member?.guild) {
    const emojis = command.member.guild.emojis;
    if (emojis.length > 0) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      if (emoji) {
        url = `https://cdn.discordapp.com/emojis/${emoji.id}.`;
        if (emoji.animated) url += 'gif';
        else url += 'png';
        url += '?v=1';
      }
    }
  }

  if (!url) {
    const emoji = emojis[Math.floor(emojis.length * Math.random())];
    const entities = parse(emoji, { assetType: 'png' });
    if (entities.length > 0 && user) {
      const entity = entities[0];
      url = entity.url;
    }
  }

  if (url && user) {
    const embed: Omit<Eris.Embed, 'type'> & Partial<Pick<Eris.Embed, 'type'>> = {
      author: {
        name: `${user.username}#${user.discriminator}`,
        icon_url: user.avatarURL,
        url: `https://discordapp.com/users/${user.id}`,
      },
      image: { url: url },
      color: 0xFCC21B,
    };
    await command.createMessage({ embeds: [embed] });
  } else {
    await command.createMessage({
      embeds: [{
        color: 0xFF0000,
        title: '🚫 ERROR',
        description: !url ? 'unknown emoji' : 'user not found.',
      }]
    });
  }
}
