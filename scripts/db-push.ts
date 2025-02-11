import { $ } from 'bun'
import { config } from '~/src/config.mjs'

if (config.APP_ENV === 'production') {
  console.error('please do not run database push in production environment...')
  process.exit(1)
}

console.log('current database:', config.DATABASE_URL)

await $`bunx --bun drizzle-kit push`

console.log()
