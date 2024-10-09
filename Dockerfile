FROM oven/bun:1.1.30-alpine AS builder

WORKDIR /app

COPY . .

RUN apk add --update --no-cache git

RUN bun i
RUN bun run build

FROM oven/bun:1.1.30-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lockb .
COPY --from=builder /app/scripts ./scripts

RUN bun i --production

RUN rm -fr ./scripts

CMD ["bun", "run", "preview"]
