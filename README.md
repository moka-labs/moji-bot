# Discord Emoji Bot 🙂

Resend the emoji to original size!<br/>
<img src="misc/image.gif?raw=true" alt="" />

#### [Bot Invite](https://discord.com/oauth2/authorize?client_id=803818878178033708&scope=bot&permissions=11264)

## 🔧 Environments

* **BOT_TOKEN** - Discord Bot Token

## 🚀 Deploy

```shell
env BOT_TOKEN=<Discord Bot Token>
npm ci
npm run build
npm run start
```

## 🐋 Docker

### Dockerfile

```Dockerfile
FROM node:lts-alpine

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

CMD ["node", "dist/index.js"]
```

### Shell command

```shell
docker build -t discord-emoji-bot:latest .
docker run -d --name discord-emoji-bot -e BOT_TOKEN=<BOT_TOKEN> discord-emoji-bot:latest
```

## 📦 Dependencies

| package name   | version |
| -------------- | ------- |
| dotenv         | ^10.0.0  |
| eris           | ^0.15.1 |
| twemoji-parser | ^13.1.0 |
