import { $ } from 'bun'

const version = (await $`git cliff --bumped-version`).text().split('\n').at(0)

if (version === undefined) {
  process.exit(1)
}

const message = `release: ${version}`

await $`npm version ${version} --no-git-tag-version`
await $`git cliff -o -t "${version}"`
await $`git commit -a -m "${message}"`
await $`git tag -a "${version}" -m "${message}"`
