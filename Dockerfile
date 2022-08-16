FROM node:lts AS builder

ARG ARG_BOT_TOKEN
ENV NODE_ENV production
ENV BOT_TOKEN ${ARG_BOT_TOKEN}

RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build
CMD ["node", "dist/index.js"]
