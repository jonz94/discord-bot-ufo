import { config } from '~/src/config.mts'

export const isDev = config.APP_ENV.toLowerCase() === 'dev'
