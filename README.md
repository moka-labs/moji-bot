# Discord Emoji Bot 🙂
Resend the emoji to its original size.
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
