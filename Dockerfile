FROM node:20.11.1-alpine3.19 AS builder

RUN npm install -g npm@latest
RUN npm rm -g corepack
RUN npm install -g pnpm@latest

WORKDIR /app

COPY . .

# `--ignore-scripts` is for ignoring the postinstall scripts
RUN pnpm i --ignore-scripts

RUN pnpm run build

FROM node:20.11.1-alpine3.19

RUN npm install -g npm@latest
RUN npm rm -g corepack
RUN npm install -g pnpm@latest

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .

# `--ignore-scripts` is for ignoring the postinstall scripts
RUN pnpm i --prod --ignore-scripts

CMD ["pnpm", "start"]
