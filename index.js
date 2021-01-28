require('dotenv').config();
const Eris = require('eris');
const { parse } = require('twemoji-parser');

const client = new Eris.Client(process.env.BOT_TOKEN);

client.on('ready', async () => {
  client.editStatus('online', { name: 'big emotes', type: 0 });
});

client.on('messageCreate', async (msg) => {
  if (msg.guildID === undefined) return;
  if (msg.author.bot) return;
  if (msg.author === client.user) return;

  try {
    if (msg.mentions.length === 1) {
      const user = msg.mentions[0];
      if (user === client.user) {
        await msg.delete();
        const channel = await client.getDMChannel(msg.author.id);
        await client.createMessage(channel.id, {
          embed: {
            color: 0xFCC21B,
            title: 'Invite',
            description: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=11264`
          }
        });
      }
      return;
    }

    const regex = new RegExp('^<(a)?:(\\w+):(\\d{18})>$', 'g');
    const match = regex.exec(msg.content);

    let url;
    let footer;

    if (match) {
      const animated = match[1] !== undefined;
      const emoji = match[3];

      url = `https://cdn.discordapp.com/emojis/${match[3]}.`;
      if (animated) url += 'gif';
      else url += 'png';
      url += '?v=1';

      await client.requestHandler.request('GET', `/emojis/${emoji}/guild`, true)
        .then(res => { footer = res.name; })
        .catch(() => { footer = 'PRIVATE SERVER' });
    } else {
      const entities = parse(msg.content, { assetType: 'png' });
      if (entities.length === 1) {
        const entity = entities[0];
        const content = msg.content.replace(new RegExp(entity.text), '');
        if (content.length === 0) {
          url = entity.url;
        }
      }
    }

    if (url) {
      const embed = {
        author: {
          name: `${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatarURL,
          url: `https://discordapp.com/users/${msg.author.id}`
        },
        image: { url },
      };

      if (footer) embed.footer = { text: footer }

      let color;
      if (msg.member.roles.length > 0) {
        const guild = msg.member.guild;

        let position = Number.MAX_VALUE;
        for (let role of msg.member.roles) {
          role = guild.roles.get(role);
          if (position > role.position && role.color !== 0) {
            position = role.position;
            color = role.color;
          }
        }

        if (color) embed.color = color;
      }

      await client.createMessage(msg.channel.id, { embed })
    }
  } catch (e) {
    console.error(e);
  }
});

client.connect();

//     const entities = parse(msg.content, { assetType: 'png' });
//     if (entities.length === 1) {
//       const entity = entities[0];
//       const content = msg.content.replace(new RegExp(entity.text), '');
//       if (content.length === 0) {
//         url = entity.url;
//       }
//     }
//   }
//   if (url !== '') {
//     const embed = new Discord.MessageEmbed();
//     embed.setImage(url);
//     embed.setAuthor(
//       msg.author.tag,
//       msg.author.displayAvatarURL(),
//       `https://discordapp.com/users/${msg.author.id}`
//     );
//
//     if (footer !== '') {
//       embed.setFooter(footer);
//     }
//
//     // Embed Color
//     const member = msg.guild.member(msg.author);
//     if (member !== null) {
//       embed.setColor(msg.guild.member(msg.author).displayColor);
//     }
//
//     msg.channel.send(embed).then();
//     msg.delete().then();
//   }
// });
//
// client.login(process.env.BOT_TOKEN);