# discord-bot-ufo

A Discord BOT named `機器幽浮` maintained by [jonz94](https://github.com/jonz94)

## Setup

### Prerequisites

- Install [Node.js](https://nodejs.org)
- Install [pnpm](https://pnpm.io)

### Getting Started

Clone this repository:

```shell
git clone https://github.com/jonz94/discord-bot-ufo.git
```

Change to the root directory of the project:

```shell
cd discord-bot-ufo
```

Install all dependencies:

```shell
pnpm i
```

Setup `.env` and `.env.dev`:

```shell
pnpm run setup
```

Then, edit `.env` and `.env.dev` environment files respectively

- `.env` is for production environment
- `.env.dev` is for development environment

Launch the development BOT locally (using `.env.dev` configuration):

```shell
pnpm run dev
```

Run test:

```shell
pnpm test
```

Build and launch the production BOT locally (using `.env` configuration):

```shell
pnpm run build
pnpm start
```

Release new version:

```shell
pnpm run release
git push --follow-tags
```

## Production

Using the following `docker run` command:

```shell
docker run --name="discord-bot-ufo" -d \
  --restart=unless-stopped \
  -v "$(pwd)/.env:/app/.env" \
  -v "$(pwd)/database.sqlite:/app/database.sqlite" \
  jonz94/discord-bot-ufo
```

## License

See [LICENSE](https://github.com/jonz94/discord-bot-ufo/blob/main/LICENSE).

## Credits

- [楔六葉](https://twitter.com/sixleafs)
    - https://twitter.com/sixleafs/status/1766456561504023025
    - https://hackmd.io/@3Q1PwoaDQXSlvMLWWzaBww/S1pEto_ap#Render-%E4%BD%88%E7%BD%B2-Discord-Bot

- [Fellipe Utaka](https://github.com/fellipeutaka)
    - https://dev.to/fellipeutaka/creating-your-first-discord-bot-using-typescript-1eh6
    - https://github.com/fellipeutaka/discord-bot-template
