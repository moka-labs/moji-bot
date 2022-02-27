# Moji Bot
Resend the emoji to original size!<br/>
<img src="assets/image.gif?raw=true" alt="" />

## Environments
* **BOT_TOKEN** - Discord Bot Token

## Development
```shell
npm ci
npm run prepare
npm run dev
```

## Deploy
```shell
env BOT_TOKEN=<Discord Bot Token>
npm ci
npm run build
npm run start
```

## Bot Setup
### Intents
* Presence intent: enabled
* Server members intent: enabled
* Message content intent: enabled
### OAuth2 Scopes
* bot
* applications.command
### OAuth2 Permissions
* Manage Messages
* Manage Threads
* Send Messages
* Send Messages in Threads
