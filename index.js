require('dotenv').config();
const Discord = require('discord.js');
const { parse } = require('twemoji-parser');

const client = new Discord.Client();

client.on('ready', () => {
  client.user.setActivity({ name: 'big emotes' }).then();
});

client.on('message', msg => {
  if (msg.guild == null) return;
  if (msg.author.bot) return;
  if (msg.author === client.user) return;

  if (msg.mentions.users.size === 1) {
    const user = msg.mentions.users.values().next();
    if (user.value === client.user) {
      msg.delete().then();
      msg.author.createDM()
        .then(dm => {
          const embed = new Discord.MessageEmbed();
          embed.setTitle('Invite URL');
          embed.setDescription(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=11264`);
          embed.setColor('YELLOW');
          dm.send(embed).then();
        });
    }

    return;
  }

  const regex = new RegExp('^<(a)?:(\\w+):(\\d{18})>$', 'g');
  const match = regex.exec(msg.content);

  let url = '';
  if (match) {
    const animated = match[1] !== undefined;

    url = `https://cdn.discordapp.com/emojis/${match[3]}.`;
    if (animated) url += 'gif';
    else url += 'png';
    url += '?v=1';
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
  if (url !== '') {
    const embed = new Discord.MessageEmbed();
    embed.setImage(url);
    embed.setAuthor(msg.author.tag, msg.author.displayAvatarURL());

    // Embed Color
    const member = msg.guild.member(msg.author);
    if (member !== null) {
      embed.setColor(msg.guild.member(msg.author).displayColor);
    }

    msg.channel.send(embed).then();
    msg.delete().then();
  }
});

client.login(process.env.BOT_TOKEN);
