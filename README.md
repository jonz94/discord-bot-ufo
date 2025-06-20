# discord-bot-ufo

<a href="https://github.com/jonz94/discord-bot-ufo/actions/workflows/build.yml"><img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/jonz94/discord-bot-ufo/build.yml?logo=github&style=flat-square"></a>
<a href="https://hub.docker.com/r/jonz94/discord-bot-ufo"><img alt="latest release" src="https://img.shields.io/docker/v/jonz94/discord-bot-ufo?logo=docker&style=flat-square"></a>
<a href="./LICENSE"><img alt="0BSD License" src="https://img.shields.io/github/license/jonz94/discord-bot-ufo?style=flat-square"></a>
<a href="https://conventionalcommits.org"><img alt="Conventional Commits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?style=flat-square"></a>


A Discord BOT named `機器幽浮` maintained by [jonz94](https://github.com/jonz94)

## Docker Hub

You can pull the Docker image from Docker Hub: https://hub.docker.com/r/jonz94/discord-bot-ufo

## Development Setup

### Prerequisites

- Install [Bun](https://bun.sh) (required to install packages, build and run locally)

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

Or using the following `docker compose` command:

```shell
docker compose build
docker compose up
```

## License

Licensed under the [BSD Zero Clause License](./LICENSE).

## Credits

- [楔六葉](https://x.com/sixleafs)
    - https://x.com/sixleafs/status/1766456561504023025
    - https://hackmd.io/@3Q1PwoaDQXSlvMLWWzaBww/S1pEto_ap#Render-%E4%BD%88%E7%BD%B2-Discord-Bot

- [Fellipe Utaka](https://github.com/fellipeutaka)
    - https://dev.to/fellipeutaka/creating-your-first-discord-bot-using-typescript-1eh6
    - https://github.com/fellipeutaka/discord-bot-template
