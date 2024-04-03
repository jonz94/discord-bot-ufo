declare module 'bun' {
  interface Env {
    APP_ENV: string
    APP_PORT: string
    DISCORD_TOKEN: string
    DISCORD_CLIENT_ID: string
    DATABASE_URL: string
    DATABASE_AUTH_TOKEN: string
  }
}

const { APP_ENV, APP_PORT, DISCORD_TOKEN, DISCORD_CLIENT_ID, DATABASE_URL, DATABASE_AUTH_TOKEN } = Bun.env

const config = {
  APP_ENV,
  APP_PORT,
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DATABASE_URL,
  DATABASE_AUTH_TOKEN,
}

for (const [key, value] of Object.entries(config)) {
  if (value === undefined) {
    throw new Error(`Missing environment variables ${key}`)
  }
}

export { config }
