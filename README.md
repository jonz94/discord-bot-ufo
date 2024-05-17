# discord-bot-ufo

A Discord BOT named `機器幽浮` maintained by [jonz94](https://github.com/jonz94)

## Setup

### Prerequisites

- Install [Bun](https://bun.sh)

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
bun i
```

Setup `.env` and `.env.dev`:

```shell
bun run setup
```

Then, edit `.env` and `.env.dev` environment files respectively

- `.env` is for production environment
- `.env.dev` is for development environment

Launch the development BOT locally (using `.env.dev` configuration):

```shell
bun start
```

Run test:

```shell
bun run test
```

Build and launch the production BOT locally (using `.env` configuration):

```shell
bun run build
bun run preview
```

## Release

### Prerequisites

- Install [git-cliff](https://git-cliff.org/)

### Instructions

1. Bump version

```shell
bun run release
```

2. Push commits with tags

```shell
git push --follow-tags
```

3. [GitHub Actions](https://github.com/jonz94/discord-bot-ufo/actions/workflows/build.yml) will be triggered and it will build the [Docker Image](https://hub.docker.com/r/jonz94/discord-bot-ufo) for us

## Production

Using the following `docker run` command:

```shell
docker run --name="discord-bot-ufo" -d \
  --restart=unless-stopped \
  -v "$(pwd)/.env:/app/.env" \
  jonz94/discord-bot-ufo
```

## License

See [LICENSE](https://github.com/jonz94/discord-bot-ufo/blob/main/LICENSE).

## Credits

- [楔六葉](https://x.com/sixleafs)
    - https://x.com/sixleafs/status/1766456561504023025
    - https://hackmd.io/@3Q1PwoaDQXSlvMLWWzaBww/S1pEto_ap#Render-%E4%BD%88%E7%BD%B2-Discord-Bot

- [Fellipe Utaka](https://github.com/fellipeutaka)
    - https://dev.to/fellipeutaka/creating-your-first-discord-bot-using-typescript-1eh6
    - https://github.com/fellipeutaka/discord-bot-template
