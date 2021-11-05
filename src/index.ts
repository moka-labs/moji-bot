import 'dotenv/config';
import Eris from 'eris';
import { parse } from 'twemoji-parser';

const client = new Eris.Client(process.env.BOT_TOKEN ?? '');

client.on('ready', async () => {
  process.send?.('ready');
  client.editStatus('online', { name: 'big emotes', type: 0 });
});

client.on('messageCreate', async (msg) => {
  if (msg == null) return;
  if (msg.member == null) return;
  if (msg.guildID === undefined) return;
  if (msg.author.bot) return;
  if (msg.author === client.user) return;

  try {
    // 봇을 호출하였을 경우 초대링크를 DM 으로 보내줍니다.
    if (msg.content === `<@!${client.user.id}>`) {
      await msg.delete();
      const channel = await client.getDMChannel(msg.author.id);
      await client.createMessage(channel.id, {
        embed: {
          color: 0xFCC21B,
          title: 'Invite',
          description: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=11264`,
        },
      });
      return;
    }

    // 메세지 검사용 정규식
    const regex = new RegExp('^<(a)?:(\\w+):(\\d{18})>$', 'g');
    const match = regex.exec(msg.content);

    let url: string | undefined;
    let footer: string | undefined;

    if (match) {
      const animated = match[1] !== undefined;
      const emoji = match[3];

      url = `https://cdn.discordapp.com/emojis/${match[3]}.`;
      if (animated) url += 'gif';
      else url += 'png';
      url += '?v=1';

      await client.requestHandler.request('GET', `/emojis/${emoji}/guild`, true)
        .then((res: any) => {
          footer = res.name as string;
        }).catch(() => {
          footer = 'PRIVATE SERVER';
        });
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

    // URL 이 있을 경우
    if (url) {
      const embed: Omit<Eris.Embed, 'type'> & Partial<Pick<Eris.Embed, 'type'>> = {
        author: {
          name: `${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatarURL,
          url: `https://discordapp.com/users/${msg.author.id}`,
        },
        image: { url },
      };

      if (footer) embed.footer = { text: footer };

      if (msg.member.roles.length > 0) {
        const guild = msg.member.guild;

        const roles = msg.member.roles
          .map(role => guild.roles.get(role))
          .filter((role): role is Eris.Role => role != null)
          .filter(role => role.color !== 0);

        // 배열이 1개 이상일 경우 작동
        if (roles.length > 0) {
          const role = roles.reduce((prev, curr) => {
            if (!prev) return curr;
            if (curr.position === prev.position) return prev.id > curr.id ? prev : curr;
            else return curr.position > prev.position ? curr : prev;
          });

          if (role) {
            embed.color = role.color;
          }
        }
      }

      // 개발중일 경우 메세지를 보내지않습니다.
      if (process.env.NODE_ENV === 'production') {
        const content = { embed };
        if (msg.messageReference) {
          (content as any).message_reference = {
            message_id: msg.messageReference.messageID,
            channel_id: msg.messageReference.channelID,
            guild_id: msg.messageReference.guildID,
          };
        }
        await client.deleteMessage(msg.channel.id, msg.id);
        await client.createMessage(msg.channel.id, content);
      }
    }
  } catch (e) {
    console.error(e);
  }
});

client.connect();
process.on('SIGINT', function() {
  client.disconnect({});
  process.exit(0);
});
