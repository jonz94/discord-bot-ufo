# Changelog

All notable changes to this project will be documented in this file.

## [4.1.4](https://github.com/jonz94/discord-bot-ufo/compare/v4.1.3...v4.1.4) (2024-04-09)

### ⚙️ Miscellaneous Tasks

- *(deps)* Update `hono` to 4.2.3 ([a5bf507](https://github.com/jonz94/discord-bot-ufo/commit/a5bf50796a940bf96ff2fefeb11575d11d19dfa9))
- *(dev-deps)* Update `typescript` to 5.4.4 ([e0ba0af](https://github.com/jonz94/discord-bot-ufo/commit/e0ba0afaa0bbedb660ecc3cb28726375093dcae5))
- *(runtime)* Update `bun` to 1.1.3 ([e5bd93f](https://github.com/jonz94/discord-bot-ufo/commit/e5bd93f8917b550f1e11fa1f3c47388e8589c855))

## [4.1.3](https://github.com/jonz94/discord-bot-ufo/compare/v4.1.2...v4.1.3) (2024-04-06)

### 🐛 Bug Fixes

- Fix `/yt` command ([75b8723](https://github.com/jonz94/discord-bot-ufo/commit/75b872385d300f3e89cf10eec521c30b8ad628c2))

### ⚙️ Miscellaneous Tasks

- *(runtime)* Update `bun` to 1.1.2 ([db4757c](https://github.com/jonz94/discord-bot-ufo/commit/db4757c6657678b9dfa16f9c5d6c47b1849f6895))
- *(scripts)* Make bun's autocomplete happy ([4d54662](https://github.com/jonz94/discord-bot-ufo/commit/4d546625c5623e4424b38d71abe5c8bb8f05ac75))
- Tweaks `cliff` settings ([9fc15ff](https://github.com/jonz94/discord-bot-ufo/commit/9fc15ffe1336388ea3d021aadeeaa522fe306d52))

## [4.1.2](https://github.com/jonz94/discord-bot-ufo/compare/v4.1.1...v4.1.2) (2024-04-05)

### 🐛 Bug Fixes

- Fix `/fx` command ([63661be](https://github.com/jonz94/discord-bot-ufo/commit/63661be63c308f8fcc7b94a175603a2a1fceeb52))

### 🚜 Refactor

- Add typescript path mapping ([ed6b628](https://github.com/jonz94/discord-bot-ufo/commit/ed6b628f7cd6a043a3c6aff1ebd390067dd0ad9d))
- Improve implementation details ([e3dae93](https://github.com/jonz94/discord-bot-ufo/commit/e3dae936c1a8bac4b034a93a0c50b32f743ba538))

### 🧪 Testing

- Test can be run without setup environment files ([83e38c3](https://github.com/jonz94/discord-bot-ufo/commit/83e38c3b7b0f67e7396ae9a202d4b23b1a00aa79))

## [4.1.1](https://github.com/jonz94/discord-bot-ufo/compare/v4.1.0...v4.1.1) (2024-04-05)

### ⚙️ Miscellaneous Tasks

- Replace `commit-and-tag-version` with `git-cliff` ([a67eaeb](https://github.com/jonz94/discord-bot-ufo/commit/a67eaeb690326c999441b0f38f0f76b81e3f2059))
- Add `.gitattributes` for bun's lockfile ([b1f90a4](https://github.com/jonz94/discord-bot-ufo/commit/b1f90a4c7014c83940c2b05fc40e049fb97cb6b7))

## [4.1.0](https://github.com/jonz94/discord-bot-ufo/compare/v4.0.0...v4.1.0) (2024-04-03)

### 🚀 Features

- Add api endpoint ([ec828f1](https://github.com/jonz94/discord-bot-ufo/commit/ec828f1a3d6a935226d3b97f9c3977f3dcb2c1c0))

### ⚙️ Miscellaneous Tasks

- *(deps)* Update `drizzle-orm` to 0.30.7 ([45a20c7](https://github.com/jonz94/discord-bot-ufo/commit/45a20c746b0c45f32de76cb0680dba3a370a6094))

## [4.0.0](https://github.com/jonz94/discord-bot-ufo/compare/v3.2.3...v4.0.0) (2024-04-03)

### 🚀 Features

- [**breaking**] Change runtime to `bun` ([ba289af](https://github.com/jonz94/discord-bot-ufo/commit/ba289aff9575bf4720587cbf0f66d6c05c83aab7))
- [**breaking**] Change database client to `@libsql/client` ([2469882](https://github.com/jonz94/discord-bot-ufo/commit/246988270b8dd992284533db6058a8c7d2d832ec))

### ⚙️ Miscellaneous Tasks

- *(deps)* Update `drizzle-orm` to 0.30.6 ([dd7d2c8](https://github.com/jonz94/discord-bot-ufo/commit/dd7d2c81e39a22a3e05207140ba2030fe38dd6f9))
- *(dev-deps)* Update `typescript` to 5.4.3 ([4eda423](https://github.com/jonz94/discord-bot-ufo/commit/4eda4238e0752db1d020416ed4ab7910e28c2db0))
- *(dev-deps)* Update `prettier-plugin-packagejson` to 2.4.14 ([93ad72b](https://github.com/jonz94/discord-bot-ufo/commit/93ad72b0852255aa8e1fe5b7994d9865c0e3bcf0))
- Remove sqlite related settings ([484780b](https://github.com/jonz94/discord-bot-ufo/commit/484780b2ec8762eb36a4193c3d1700f33b9b3efd))

## [3.2.3](https://github.com/jonz94/discord-bot-ufo/compare/v3.2.2...v3.2.3) (2024-04-02)

### 🐛 Bug Fixes

- Ensure guild is in the whitelist ([12ad8b4](https://github.com/jonz94/discord-bot-ufo/commit/12ad8b4270dcb1a68499ac6ff718ffad3288d9af))
- Allow different guilds to start brawls simultaneously ([dc3d942](https://github.com/jonz94/discord-bot-ufo/commit/dc3d942ecfb0eb5632b98da9f9614dc10b4f8b59))

### ⚙️ Miscellaneous Tasks

- Update `node.js` to 20.12.0 ([e74f4a3](https://github.com/jonz94/discord-bot-ufo/commit/e74f4a31a4091b6bd9f247657e8efd4251ef84d8))
- Ensure that correct version of `node.js` and `pnpm` is installed ([78bdb9a](https://github.com/jonz94/discord-bot-ufo/commit/78bdb9a6b6c276525f66bdf0c7caea73ab7a534e))

## [3.2.2](https://github.com/jonz94/discord-bot-ufo/compare/v3.2.1...v3.2.2) (2024-03-23)

### 🐛 Bug Fixes

- Correct unfinished game checking logic ([aacf05c](https://github.com/jonz94/discord-bot-ufo/commit/aacf05c92c717f56b68b7cdc9e5c38b4579b8825))

### ⚡ Performance

- Ignore unimportant message ([cd474a7](https://github.com/jonz94/discord-bot-ufo/commit/cd474a7afeb23b4f4c2a6031337e113d1f09d78b))

## [3.2.1](https://github.com/jonz94/discord-bot-ufo/compare/v3.2.0...v3.2.1) (2024-03-19)

### 🐛 Bug Fixes

- Improve wording ([0dda894](https://github.com/jonz94/discord-bot-ufo/commit/0dda894ab5bc5a3cf9b191a7db0de6fc602b7e8d))

### ⚙️ Miscellaneous Tasks

- *(deps)* Update `drizzle-orm` to 0.30.4 ([1c70215](https://github.com/jonz94/discord-bot-ufo/commit/1c70215c864df62a82870c0a7410b152b9851062))
- *(dev-deps)* Fix `typescript` version ([ce83b74](https://github.com/jonz94/discord-bot-ufo/commit/ce83b74f85daa63340242a08af13780c1e6a121d))
- Remove log messages for debugging ([ba2c5ca](https://github.com/jonz94/discord-bot-ufo/commit/ba2c5ca0ad5959b0d27ef6113b70c718a2bd1af2))

## [3.2.0](https://github.com/jonz94/discord-bot-ufo/compare/v3.1.0...v3.2.0) (2024-03-19)

### 🚀 Features

- Add brawl command ([e5333b8](https://github.com/jonz94/discord-bot-ufo/commit/e5333b8fca747a949cfa1221c7569177b3cac87c))

### 🚜 Refactor

- Extract reaction handling logic ([3003a4f](https://github.com/jonz94/discord-bot-ufo/commit/3003a4fd5270fb9956c7e12d88107bb9aa7db7e6))

## [3.1.0](https://github.com/jonz94/discord-bot-ufo/compare/v3.0.1...v3.1.0) (2024-03-19)

### 🚀 Features

- Improve text message ([0c56872](https://github.com/jonz94/discord-bot-ufo/commit/0c56872a95954a16b987f4a9fe7df2167981f726))
- Add response message ([1ed4007](https://github.com/jonz94/discord-bot-ufo/commit/1ed40071e59eadcbd7ca4fabb0b2d7e9af60fb9d))

## [3.0.1](https://github.com/jonz94/discord-bot-ufo/compare/v3.0.0...v3.0.1) (2024-03-18)

### 🐛 Bug Fixes

- Correct docker image's running command ([584a10c](https://github.com/jonz94/discord-bot-ufo/commit/584a10c15768a5f3bc16c784b9affd7da71bdb68))

### 🚜 Refactor

- Simplify configuration files reading mechanism ([9126459](https://github.com/jonz94/discord-bot-ufo/commit/912645905a1f7ce59350b5cae04bfd9944752947))

## [3.0.0](https://github.com/jonz94/discord-bot-ufo/compare/v2.1.0...v3.0.0) (2024-03-18)

### 🚀 Features

- Add more log messages ([246a612](https://github.com/jonz94/discord-bot-ufo/commit/246a612cfbe8c291c5a4ecc7aaddfc80325ed657))
- Automatically roll dice after sending fight ([51ea32b](https://github.com/jonz94/discord-bot-ufo/commit/51ea32bb1ff4cb3f442e4689b4a956ab680a4649))
- Add 30 seconds timeout for every game ([4a94391](https://github.com/jonz94/discord-bot-ufo/commit/4a94391c1118af6f24f5c73a94f1f04ebdc8f782))
- Improve error message ([07943c6](https://github.com/jonz94/discord-bot-ufo/commit/07943c6d0778b9687b2811b0af8bef36cee0bdea))
- [**breaking**] Record channel id database into database ([506ebfc](https://github.com/jonz94/discord-bot-ufo/commit/506ebfc1bc6f3ffc0b53166db541b7ea0c41de55))

### 📚 Documentation

- Add `docker run` command ([61761c2](https://github.com/jonz94/discord-bot-ufo/commit/61761c23274670d19b50b918b9e1afbb12309410))

### ⚙️ Miscellaneous Tasks

- Adjust settings related to database ([7f9b594](https://github.com/jonz94/discord-bot-ufo/commit/7f9b594fae732b6dc86fa86952b595f03ef47479))
- Update npm scripts ([ba0d1c7](https://github.com/jonz94/discord-bot-ufo/commit/ba0d1c79a327079b5243d05e2704c11c50ac8f9b))

## [2.1.0](https://github.com/jonz94/discord-bot-ufo/compare/v2.0.0...v2.1.0) (2024-03-17)

### 🚀 Features

- 改善對戰結果顯示方式 ([d136d0f](https://github.com/jonz94/discord-bot-ufo/commit/d136d0f2a77565d5050b6a02ee53f5beafe2a194))
- 增加對戰提示訊息 ([277026f](https://github.com/jonz94/discord-bot-ufo/commit/277026f2fa86fc38e285e183b79cb4faf250ab4f))

## [2.0.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.6.2...v2.0.0) (2024-03-17)

### 🐛 Bug Fixes

- Remove testing code ([5262104](https://github.com/jonz94/discord-bot-ufo/commit/52621048d3b3abea3b6abf778c50f683cba89b0e))

## [1.6.2](https://github.com/jonz94/discord-bot-ufo/compare/v1.6.1...v1.6.2) (2024-03-17)

### 🐛 Bug Fixes

- Make docker image work ([bc4f152](https://github.com/jonz94/discord-bot-ufo/commit/bc4f152fe15eb142335f69ada254a4b2bb963ace))

### ⚙️ Miscellaneous Tasks

- *(scripts)* Catch error when running setup script ([5450773](https://github.com/jonz94/discord-bot-ufo/commit/54507733288a222ef8c3e81a6797a3a5e64e49cd))

## [1.6.1](https://github.com/jonz94/discord-bot-ufo/compare/v1.6.0...v1.6.1) (2024-03-17)

### 🐛 Bug Fixes

- Resolve docker build issue ([aabe86a](https://github.com/jonz94/discord-bot-ufo/commit/aabe86ae78aef69e1c304400895b99a51542821a))

### ⚙️ Miscellaneous Tasks

- Remove unused `rimraf` package ([a24a93e](https://github.com/jonz94/discord-bot-ufo/commit/a24a93e4854c1303fa3786116cc2a0db4c2a59f0))
- Use `tsup.config.ts` to config `tsup` ([6f8324f](https://github.com/jonz94/discord-bot-ufo/commit/6f8324f8afa818eef1191f557defe39e3705a632))

## [1.6.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.5.1...v1.6.0) (2024-03-17)

### 🚀 Features

- Put server list data into database ([7ea0c77](https://github.com/jonz94/discord-bot-ufo/commit/7ea0c7790f6c1cbd93520f805f25aa49bbcc9f73))
- Setup `drizzle-orm` and `drizzle-kit` ([acc818d](https://github.com/jonz94/discord-bot-ufo/commit/acc818d5c4e696f344530cb7f3379643e7f99516))
- Programmatically setup environment files ([77b34e1](https://github.com/jonz94/discord-bot-ufo/commit/77b34e1b8c8efb726b6b736811db46556f54bd23))

### 🚜 Refactor

- Put game data into database ([9f52422](https://github.com/jonz94/discord-bot-ufo/commit/9f524225ff58f2ee5f1fcab8ecf1a7d0270f941f))

### ⚙️ Miscellaneous Tasks

- *(dev-deps)* Update `vitest` to 1.4.0 ([28e78e5](https://github.com/jonz94/discord-bot-ufo/commit/28e78e5fbe81cdba15196f1cf88a81f13db4f556))

## [1.5.1](https://github.com/jonz94/discord-bot-ufo/compare/v1.5.0...v1.5.1) (2024-03-11)

### 🐛 Bug Fixes

- Correct docker tag name ([44988c6](https://github.com/jonz94/discord-bot-ufo/commit/44988c6e0a4bdcb0668e1e171f359a2d27f74f4b))

## [1.5.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.4.0...v1.5.0) (2024-03-11)

### 🚀 Features

- Build multi-platform docker image ([3b1a8c0](https://github.com/jonz94/discord-bot-ufo/commit/3b1a8c029ce0a8b3538f9d1a23120ee80647f4fc))

### 📚 Documentation

- Add `README.md` ([e924e32](https://github.com/jonz94/discord-bot-ufo/commit/e924e32b26cbfd78b679f526f231f67cd715b06f))

## [1.4.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.3.1...v1.4.0) (2024-03-11)

### 🚀 Features

- Add ci to build and push docker image ([e7c2362](https://github.com/jonz94/discord-bot-ufo/commit/e7c2362b2156d83ee50081d3e5467fccf7c6f562))

## [1.3.1](https://github.com/jonz94/discord-bot-ufo/compare/v1.3.0...v1.3.1) (2024-03-11)

### 🚜 Refactor

- Clean up implementation ([73ad5ec](https://github.com/jonz94/discord-bot-ufo/commit/73ad5eccbf0a32866aa2a18959b3b611adf02eb0))

### ⚡ Performance

- Reduce docker image size ([c74e61d](https://github.com/jonz94/discord-bot-ufo/commit/c74e61de73f80818b190a19b14664eeba078e5ae))

### 🎨 Styling

- Format coding style ([2f068a0](https://github.com/jonz94/discord-bot-ufo/commit/2f068a0120a6e25ca9ee4869c64b82d8116682a0))

### 🧪 Testing

- Add test for utils ([18a39b0](https://github.com/jonz94/discord-bot-ufo/commit/18a39b0191e9a7dbb692c128e5960535057e0775))

### ⚙️ Miscellaneous Tasks

- Setup `vitest` ([1b99246](https://github.com/jonz94/discord-bot-ufo/commit/1b992461dc72344d4cd5ec82e280d02ca0dacadd))
- Update `prettier` settings ([8246c81](https://github.com/jonz94/discord-bot-ufo/commit/8246c817bd920b97bff04ab1f6bba15807c405ad))

## [1.3.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.2.0...v1.3.0) (2024-03-10)

### 🚀 Features

- Add `fx` command for cleaning up Twitter url ([8bf6fdf](https://github.com/jonz94/discord-bot-ufo/commit/8bf6fdf0ab5f44dc19e142a45358abec1b8d8197))

### 🐛 Bug Fixes

- Use same error reply when parse YouTube url failed ([f8c6411](https://github.com/jonz94/discord-bot-ufo/commit/f8c641114f28af3443ce106830b5fb2479db1817))

## [1.2.0](https://github.com/jonz94/discord-bot-ufo/compare/v1.1.1...v1.2.0) (2024-03-10)

### 🚀 Features

- Allowing the development bot to be in multiple Discord servers ([c0fac50](https://github.com/jonz94/discord-bot-ufo/commit/c0fac505db96e7a5dcadcb75fb3ea2f5b572980b))
- Show server name and guild id when deploy commands ([1d5fa34](https://github.com/jonz94/discord-bot-ufo/commit/1d5fa3456b28a38f320c524fae5e398a990e4728))

### 🐛 Bug Fixes

- Resolve typescript issue ([e890d40](https://github.com/jonz94/discord-bot-ufo/commit/e890d4087b575b29d77938d0bc8bf8fb32c51a6b))

## [1.1.1](https://github.com/jonz94/discord-bot-ufo/compare/v1.1.0...v1.1.1) (2024-03-10)

### 🐛 Bug Fixes

- Resolve score not correct issue ([c27b812](https://github.com/jonz94/discord-bot-ufo/commit/c27b8120a2e553cb37f69d34bc4120dbe26cc177))

### 🚜 Refactor

- Extract database related function ([264281d](https://github.com/jonz94/discord-bot-ufo/commit/264281dbcde7e7b248a34da1ce8f717b86f51f3e))
- Reuse command name ([03019f4](https://github.com/jonz94/discord-bot-ufo/commit/03019f444d419e0b628ad3f76a01a9ae27574fd9))

## 1.1.0 (2024-03-10)

### 🚀 Features

- Use different bot for development ([435153f](https://github.com/jonz94/discord-bot-ufo/commit/435153f95fe9268fb9f4d1e952011f7530c2ded5))
- Add `0BSD` license file ([a3bcbbe](https://github.com/jonz94/discord-bot-ufo/commit/a3bcbbe4189347d82ad66adcb579d45f0e6137a3))
- Add docker ([d4a87e2](https://github.com/jonz94/discord-bot-ufo/commit/d4a87e2c8b1b9c5891e7b7d872ac539f25250c0d))
- Initial commit ([7743b40](https://github.com/jonz94/discord-bot-ufo/commit/7743b400106a02666a0f78bae35f1cdc0789e0a5))

### 🐛 Bug Fixes

- Resolve emoji not found issue ([1cb9f92](https://github.com/jonz94/discord-bot-ufo/commit/1cb9f92217a343f7f636fb1b1d84b86eceabd2b7))

### 🚜 Refactor

- Remove unused `cpy-cli` package ([1479eb5](https://github.com/jonz94/discord-bot-ufo/commit/1479eb59bf26f744a3cd34f825648aa7af44c73a))
- Clean up logic related to `NODE_ENV` variable ([e08a9ae](https://github.com/jonz94/discord-bot-ufo/commit/e08a9ae7a55ea5cd11a5ee655e85b9df1e3fd780))
- Change package type to `module` ([db53f76](https://github.com/jonz94/discord-bot-ufo/commit/db53f76a195efaf536a06f3c1485a73823a09b4b))

### ⚙️ Miscellaneous Tasks

- Setup `commit-and-tag-version` ([0b7ba05](https://github.com/jonz94/discord-bot-ufo/commit/0b7ba053fb67646e0d1bbda02345c39ec01cfcfa))
- Ignore all environment files except the example one ([8492ae2](https://github.com/jonz94/discord-bot-ufo/commit/8492ae2040264deddbe055ff8079332ffdaed960))
- Mark `node.js` and `pnpm` version ([cd64105](https://github.com/jonz94/discord-bot-ufo/commit/cd64105c55c66428029b51bd1c4762c4a647e7e4))

<!-- generated by git-cliff -->
