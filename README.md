# Discord Emoji Bot 🙂
Resend the emoji to original size!<br/>
<img src="misc/image.gif?raw=true" alt="" />

#### [Bot Invite](https://discord.com/oauth2/authorize?client_id=803818878178033708&scope=bot&permissions=11264)

## 🔧 Environments
* **BOT_TOKEN** - Discord Bot Token

## 🚀 Deploy
```shell
env BOT_TOKEN=<Discord Bot Token>
yarn install --frozen-lockfile
npm run index.js
```

## 🐋 Docker
### Dockerfile
```Dockerfile
FROM node:lts-alpine

WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile

CMD ["node", "index.js"]
```

### Shell command
```shell
docker build -t discord-emoji-bot:latest .
docker run -d --name discord-emoji-bot -e BOT_TOKEN=<BOT_TOKEN> discord-emoji-bot:latest
```

## 📦 Dependencies
| package name   | version |
| -------------- | ------- |
| dotenv         | ^8.2.0  |
| eris           | ^0.14.0 |
| twemoji-parser | ^13.0.0 |
