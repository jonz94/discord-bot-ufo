import dotenv from 'dotenv'

// load different .env file based on NODE_ENV variable
// credits: https://github.com/motdotla/dotenv/issues/272#issuecomment-364677176
const path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path })

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error('Missing environment variables')
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
}
