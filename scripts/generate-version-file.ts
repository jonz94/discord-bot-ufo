import { $ } from 'bun'
import { exit } from 'node:process'

if (Bun.env.NODE_ENV === 'production') {
  exit()
}

// get version number from `package.json`
const version = (await Bun.file('package.json').json()).version

// get unix timestamp of latest git commit
const time = await $`git log -1 --pretty=format:"%cI"`.text()
const timestamp = new Date(time).getTime() / 1000

const input = `// IMPORTANT: THIS FILE IS AUTO GENERATED BY "bun run generate-version-file"!
// IMPORTANT: DO NOT MANUALLY EDIT OR CHECK-IN!
export const version = '${version}' as const
export const timestamp = ${timestamp} as const
`

await Bun.write('src/version.ts', input)
