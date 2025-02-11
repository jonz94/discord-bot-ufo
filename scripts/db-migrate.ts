import { $ } from 'bun'
import { config } from '~/src/config.mjs'

console.log('current database:', config.DATABASE_URL)

await $`bunx --bun drizzle-kit migrate`

console.log()
