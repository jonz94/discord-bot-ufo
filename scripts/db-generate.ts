import { $ } from 'bun'
import { config } from '~/src/config'

console.log('current database:', config.DATABASE_URL)

await $`bunx --bun drizzle-kit generate`

console.log()
