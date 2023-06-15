import fetch from 'cross-fetch';
import Eris from 'eris';
import sharp from 'sharp';
import { parse } from 'twemoji-parser';

export const messageCreateHandler = async (
  client: Eris.Client,
  msg: Eris.Message<Eris.PossiblyUncachedTextableChannel>
) => {
  if (msg == null) return;
  if (msg.author.bot) return;
  if (msg.author === client.user) return;
  if (msg.attachments.length > 0) return;

  try {
    // 메세지 검사용 정규식
    const regex = new RegExp('^<(a)?:(\\w+):(\\d+)>$', 'g');
    const match = regex.exec(msg.content);

    let url: string | undefined;
    let footer: string | undefined;
    let animated = false;

    if (match) {
      animated = match[1] !== undefined;
      const emoji = match[3];

      url = `https://cdn.discordapp.com/emojis/${match[3]}.`;
      if (animated) url += 'gif';
      else url += 'webp';
      url += '?v=1';

      await client.requestHandler
        .request('GET', `/emojis/${emoji}/guild`, true)
        .then((res) => {
          footer = (res as { name: string }).name;
        })
        .catch(() => {
          footer = 'PRIVATE SERVER';
        })
        .finally(() => {
          if (!footer) footer = 'PRIVATE SERVER';
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

    // URL 이 있을 경우 메세지를 처리합니다.
    if (url) {
      let resized = false;
      let buffer: Buffer | undefined = undefined;

      try {
        const original = await fetch(url).then((res) => res.arrayBuffer());
        buffer = Buffer.from(original);

        // resize to if width < 128 or height < 128
        const imageSize = 128;
        const { info } = await sharp(buffer)
          .raw()
          .toBuffer({ resolveWithObject: true });

        if (info.width < imageSize && info.height < imageSize) {
          // 두개다 128보다 작을 경우 더 큰쪽을 128으로 맞춥니다.
          const bigger = Math.max(info.width, info.height);
          const multiplier = imageSize / bigger;
          const image = sharp(buffer, { animated }).resize(
            Math.round(info.width * multiplier),
            Math.round(info.height * multiplier)
          );

          if (animated) {
            buffer = await image.gif().toBuffer();
          } else {
            buffer = await image.webp().toBuffer();
          }

          resized = true;
        }
      } catch (err) {
        console.error('file resize error:', err);
      }

      let name = msg.author.username;
      if (msg.author.discriminator !== '0') name += `#${msg.author.discriminator}`;

      const embed: Omit<Eris.Embed, 'type'> &
        Partial<Pick<Eris.Embed, 'type'>> = {
        author: {
          name,
          icon_url: msg.author.avatarURL,
          url: `https://discordapp.com/users/${msg.author.id}`,
        },
        image: { url },
      };

      if (footer) embed.footer = { text: footer };
      if (msg.guildID && msg.member && msg.member.roles.length > 0) {
        const guild = msg.member.guild;

        const roles = msg.member.roles
          .map((role) => guild.roles.get(role))
          .filter((role): role is Eris.Role => role != null)
          .filter((role) => role.color !== 0);

        // 배열이 1개 이상일 경우 작동
        if (roles.length > 0) {
          const role = roles.reduce((prev, curr) => {
            if (!prev) return curr;
            if (curr.position === prev.position)
              return prev.id > curr.id ? prev : curr;
            else return curr.position > prev.position ? curr : prev;
          });

          if (role) {
            embed.color = role.color;
          }
        }
      }

      const fileContent: Eris.FileContent[] = [];
      if (resized && buffer !== undefined) {
        embed.image = {
          url: `attachment://image.${animated ? 'gif' : 'webp'}`,
        };
        fileContent.push({
          file: buffer,
          name: `image.${animated ? 'gif' : 'webp'}`,
        });
      }

      const content: Eris.MessageContent = { embed };

      if (msg.messageReference && msg.messageReference.messageID) {
        content.messageReference = {
          messageID: msg.messageReference.messageID,
        };
      }

      if (msg.guildID)
        await client.deleteMessage(msg.channel.id, msg.id).catch(console.error);
      await client
        .createMessage(msg.channel.id, content, fileContent)
        .catch(console.error);
    }
  } catch (e) {
    console.error(e);
  }
};
