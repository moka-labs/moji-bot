FROM node:lts

ARG ARG_BOT_TOKEN
ENV BOT_TOKEN ${ARG_BOT_TOKEN}

SHELL ["/bin/bash", "-c"]

WORKDIR /app
COPY . .
RUN npm install && \
    npm run build

ENV NODE_ENV production
CMD ["node", "dist/index.js"]
