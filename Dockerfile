FROM node:lts

ARG ARG_BOT_TOKEN
ENV BOT_TOKEN ${ARG_BOT_TOKEN}

SHELL ["/bin/bash", "-c"]
RUN curl -fsSL https://get.pnpm.io/install.sh | bash -

WORKDIR /app
COPY . .
RUN source /root/.bashrc && \
    pnpm install --frozen-lockfile && \
    pnpm run build

ENV NODE_ENV production
CMD ["node", "dist/index.js"]
