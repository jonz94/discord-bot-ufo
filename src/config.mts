import dotenv from 'dotenv'
import { isDev } from './utils.mjs'

// load different .env file based on NODE_ENV variable
// credits: https://github.com/motdotla/dotenv/issues/272#issuecomment-364677176
const path = isDev ? `.env.dev` : '.env'
dotenv.config({ path })

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DATABASE_URL, DATABASE_AUTH_TOKEN } = process.env

if (
  DISCORD_TOKEN === undefined ||
  DISCORD_CLIENT_ID === undefined ||
  DATABASE_URL === undefined ||
  DATABASE_AUTH_TOKEN === undefined
) {
  throw new Error('Missing environment variables')
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DATABASE_URL,
  DATABASE_AUTH_TOKEN,
}
