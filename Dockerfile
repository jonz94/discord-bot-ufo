FROM oven/bun:1.1.8-alpine AS builder

WORKDIR /app

COPY . .

RUN bun i
RUN bun run build

FROM oven/bun:1.1.8-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lockb .

RUN bun i --production

CMD ["bun", "run", "preview"]
