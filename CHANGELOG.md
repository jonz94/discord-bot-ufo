# Changelog

All notable changes to this project will be documented in this file.

## [4.1.0](https://github.com/jonz94/discord-bot-ufo/compare/v4.0.0...v4.1.0) (2024-04-03)

### Features

-   add api endpoint ([ec828f1](https://github.com/jonz94/discord-bot-ufo/commit/ec828f1a3d6a935226d3b97f9c3977f3dcb2c1c0))

## [4.0.0](https://github.com/jonz94/discord-bot-ufo/compare/v3.2.3...v4.0.0) (2024-04-03)

### ⚠ BREAKING CHANGES

-   change runtime to `bun`
-   change database client to `@libsql/client`

### Features

-   change runtime to `bun` ([ba289af](https://github.com/jonz94/discord-bot-ufo/commit/ba289aff9575bf4720587cbf0f66d6c05c83aab7))
-   change database client to `@libsql/client` ([2469882](https://github.com/jonz94/discord-bot-ufo/commit/246988270b8dd992284533db6058a8c7d2d832ec))

## [3.2.3](https://github.com/jonz94/discord-bot-ufo/compare/v3.2.2...v3.2.3) (2024-04-02)

### Bug Fixes

-   ensure guild is in the whitelist ([12ad8b4](https://github.com/jonz94/discord-bot-ufo/commit/12ad8b4270dcb1a68499ac6ff718ffad3288d9af))
-   allow different guilds to start brawls simultaneously ([dc3d942](https://github.com/jonz94/discord-bot-ufo/commit/dc3d942ecfb0eb5632b98da9f9614dc10b4f8b59))

## [3.2.2](https://github.com/jonz94/discord-bot-ufo/compare/v3.2.1...v3.2.2) (2024-03-23)

### Bug Fixes

-   correct unfinished game checking logic ([aacf05c](https://github.com/jonz94/discord-bot-ufo/commit/aacf05c92c717f56b68b7cdc9e5c38b4579b8825))

## [3.2.1](https://github.com/jonz94/discord-bot-ufo/compare/v3.2.0...v3.2.1) (2024-03-19)

### Bug Fixes

-   improve wording ([0dda894](https://github.com/jonz94/discord-bot-ufo/commit/0dda894ab5bc5a3cf9b191a7db0de6fc602b7e8d))

## [3.2.0](https://github.com/jonz94/discord-bot-ufo/compare/v3.1.0...v3.2.0) (2024-03-19)

### Features

-   add brawl command ([e5333b8](https://github.com/jonz94/discord-bot-ufo/commit/e5333b8fca747a949cfa1221c7569177b3cac87c))

## [3.1.0](https://github.com/jonz94/discord-bot-ufo/compare/v3.0.1...v3.1.0) (2024-03-19)

### Features

-   improve text message ([0c56872](https://github.com/jonz94/discord-bot-ufo/commit/0c56872a95954a16b987f4a9fe7df2167981f726))
-   add response message ([1ed4007](https://github.com/jonz94/discord-bot-ufo/commit/1ed40071e59eadcbd7ca4fabb0b2d7e9af60fb9d))

## [3.0.1](https://github.com/jonz94/discord-bot-ufo/compare/v3.0.0...v3.0.1) (2024-03-18)

### Bug Fixes

-   correct docker image's running command ([584a10c](https://github.com/jonz94/discord-bot-ufo/commit/584a10c15768a5f3bc16c784b9affd7da71bdb68))

## [3.0.0](https://github.com/jonz94/discord-bot-ufo/compare/v2.1.0...v3.0.0) (2024-03-18)

### ⚠ BREAKING CHANGES

-   record channel id database into database

### Features

-   add more log messages ([246a612](https://github.com/jonz94/discord-bot-ufo/commit/246a612cfbe8c291c5a4ecc7aaddfc80325ed657))
-   automatically roll dice after sending fight ([51ea32b](https://github.com/jonz94/discord-bot-ufo/commit/51ea32bb1ff4cb3f442e4689b4a956ab680a4649))
-   add 30 seconds timeout for every game ([4a94391](https://github.com/jonz94/discord-bot-ufo/commit/4a94391c1118af6f24f5c73a94f1f04ebdc8f782))
-   improve error message ([07943c6](https://github.com/jonz94/discord-bot-ufo/commit/07943c6d0778b9687b2811b0af8bef36cee0bdea))
-   record channel id database into database ([506ebfc](https://github.com/jonz94/discord-bot-ufo/commit/506ebfc1bc6f3ffc0b53166db541b7ea0c41de55))

## [2.1.0](https://github.com/jonz94/discord-bot-ufo/compare/v2.0.0...v2.1.0) (2024-03-17)

### Features

-   改善對戰結果顯示方式 ([d136d0f](https://github.com/jonz94/discord-bot-ufo/commit/d136d0f2a77565d5050b6a02ee53f5beafe2a194))
-   增加對戰提示訊息 ([277026f](https://github.com/jonz94/discord-bot-ufo/commit/277026f2fa86fc38e285e183b79cb4faf250ab4f))

## [2.0.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.6.2...v2.0.0) (2024-03-17)

### Bug Fixes

-   remove testing code ([5262104](https://github.com/jonz94/discord-bot-ufo/commit/52621048d3b3abea3b6abf778c50f683cba89b0e))

## [1.6.2](https://github.com/jonz94/discord-bot-ufo/compare/v1.6.1...v1.6.2) (2024-03-17)

### Bug Fixes

-   make docker image work ([bc4f152](https://github.com/jonz94/discord-bot-ufo/commit/bc4f152fe15eb142335f69ada254a4b2bb963ace))

## [1.6.1](https://github.com/jonz94/discord-bot-ufo/compare/v1.6.0...v1.6.1) (2024-03-17)

### Bug Fixes

-   resolve docker build issue ([aabe86a](https://github.com/jonz94/discord-bot-ufo/commit/aabe86ae78aef69e1c304400895b99a51542821a))

## [1.6.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.5.1...v1.6.0) (2024-03-17)

### Features

-   put server list data into database ([7ea0c77](https://github.com/jonz94/discord-bot-ufo/commit/7ea0c7790f6c1cbd93520f805f25aa49bbcc9f73))
-   setup `drizzle-orm` and `drizzle-kit` ([acc818d](https://github.com/jonz94/discord-bot-ufo/commit/acc818d5c4e696f344530cb7f3379643e7f99516))
-   programmatically setup environment files ([77b34e1](https://github.com/jonz94/discord-bot-ufo/commit/77b34e1b8c8efb726b6b736811db46556f54bd23))

## [1.5.1](https://github.com/jonz94/discord-bot-ufo/compare/v1.5.0...v1.5.1) (2024-03-11)

### Bug Fixes

-   correct docker tag name ([44988c6](https://github.com/jonz94/discord-bot-ufo/commit/44988c6e0a4bdcb0668e1e171f359a2d27f74f4b))

## [1.5.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.4.0...v1.5.0) (2024-03-11)

### Features

-   build multi-platform docker image ([3b1a8c0](https://github.com/jonz94/discord-bot-ufo/commit/3b1a8c029ce0a8b3538f9d1a23120ee80647f4fc))

## [1.4.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.3.1...v1.4.0) (2024-03-11)

### Features

-   add ci to build and push docker image ([e7c2362](https://github.com/jonz94/discord-bot-ufo/commit/e7c2362b2156d83ee50081d3e5467fccf7c6f562))

## [1.3.1](https://github.com/jonz94/discord-bot-ufo/compare/v1.3.0...v1.3.1) (2024-03-11)

## [1.3.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.2.0...v1.3.0) (2024-03-10)

### Features

-   add `fx` command for cleaning up Twitter url ([8bf6fdf](https://github.com/jonz94/discord-bot-ufo/commit/8bf6fdf0ab5f44dc19e142a45358abec1b8d8197))

### Bug Fixes

-   use same error reply when parse YouTube url failed ([f8c6411](https://github.com/jonz94/discord-bot-ufo/commit/f8c641114f28af3443ce106830b5fb2479db1817))

## [1.2.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.1.1...v1.2.0) (2024-03-10)

### Features

-   allowing the development bot to be in multiple Discord servers ([c0fac50](https://github.com/jonz94/discord-bot-ufo/commit/c0fac505db96e7a5dcadcb75fb3ea2f5b572980b))
-   show server name and guild id when deploy commands ([1d5fa34](https://github.com/jonz94/discord-bot-ufo/commit/1d5fa3456b28a38f320c524fae5e398a990e4728))

### Bug Fixes

-   resolve typescript issue ([e890d40](https://github.com/jonz94/discord-bot-ufo/commit/e890d4087b575b29d77938d0bc8bf8fb32c51a6b))

## [1.1.1](https://github.com/jonz94/discord-bot-ufo/compare/v1.1.0...v1.1.1) (2024-03-10)

### Bug Fixes

-   resolve score not correct issue ([c27b812](https://github.com/jonz94/discord-bot-ufo/commit/c27b8120a2e553cb37f69d34bc4120dbe26cc177))

## 1.1.0 (2024-03-10)

### Features

-   use different bot for development ([435153f](https://github.com/jonz94/discord-bot-ufo/commit/435153f95fe9268fb9f4d1e952011f7530c2ded5))
-   add `0BSD` license file ([a3bcbbe](https://github.com/jonz94/discord-bot-ufo/commit/a3bcbbe4189347d82ad66adcb579d45f0e6137a3))
-   add docker ([d4a87e2](https://github.com/jonz94/discord-bot-ufo/commit/d4a87e2c8b1b9c5891e7b7d872ac539f25250c0d))
-   initial commit ([7743b40](https://github.com/jonz94/discord-bot-ufo/commit/7743b400106a02666a0f78bae35f1cdc0789e0a5))

### Bug Fixes

-   resolve emoji not found issue ([1cb9f92](https://github.com/jonz94/discord-bot-ufo/commit/1cb9f92217a343f7f636fb1b1d84b86eceabd2b7))
