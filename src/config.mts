declare module 'bun' {
  interface Env {
    APP_ENV: string
    DISCORD_TOKEN: string
    DISCORD_CLIENT_ID: string
    DATABASE_URL: string
    DATABASE_AUTH_TOKEN: string
  }
}

const { APP_ENV, DISCORD_TOKEN, DISCORD_CLIENT_ID, DATABASE_URL, DATABASE_AUTH_TOKEN } = Bun.env

const config = {
  APP_ENV,
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DATABASE_URL,
  DATABASE_AUTH_TOKEN,
}

Object.entries(config).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`Missing environment variables ${key}`)
  }
})

export { config }
