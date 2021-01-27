require('dotenv').config();
const Discord = require('discord.js');
const { parse } = require('twemoji-parser');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.author === client.user) return;

  const regex = new RegExp("^<(a)?:(\\w+):(\\d{18})>$", "g")
  const match = regex.exec(msg.content);

  let url = '';
  if (match) {
    const animated = match[1] !== undefined;

    url = `https://cdn.discordapp.com/emojis/${match[3]}.`;
    if (animated) url += "gif"
    else url += "png"
    url += "?v=1"
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

    // 임베드 색상
    const member = msg.guild.member(msg.author);
    if (member !== null) {
      embed.setColor(msg.guild.member(msg.author).displayColor);
    }

    msg.channel.send(embed).then();
    msg.delete().then();
  }
});

client.login(process.env.BOT_TOKEN);
