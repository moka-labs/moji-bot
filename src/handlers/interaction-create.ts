import Eris, { CommandInteraction, InteractionDataOptionsInteger } from 'eris';
import emojis from 'emojis-list';
import { parse } from 'twemoji-parser';

export const interactionCreateHandler = async (client: Eris.Client, interaction: Eris.Interaction) => {
  if (!(interaction instanceof CommandInteraction)) {
    return;
  }

  const command = interaction as CommandInteraction;
  switch (command.data.name) {
  case 'invite': {
    const description = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=274877918208&scope=applications.commands%20bot`;
    await command.createMessage({
      embeds: [{
        color: 0xFCC21B,
        description,
      }]
    });
    break;
  }
  case 'roll': {
    const options = (command.data.options ?? []) as InteractionDataOptionsInteger[];
    const min = options.find(opt => opt.name === 'min')?.value ?? 0;
    let max = options.find(opt => opt.name === 'max')?.value ?? min + 100;
    if (min > max) max = min + 100;
    await command.createMessage('🎲 **' + (Math.floor(Math.random() * (max - min + 1)) + min) + '**');
    break;
  }
  case 'random': {
    const user = command.member || command.user;

    let url: string | undefined;

    if (Math.random() < .5 && command.guildID && command.member?.guild) {
      const emojiCount = command.member.guild.emojiCount || 0;
      if (emojiCount > 0) {
        const emoji = command.member.guild.emojis[Math.floor(Math.random() * emojiCount)];
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

    break;
  }
  case 'pick': {
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
    break;
  }
  }
};
