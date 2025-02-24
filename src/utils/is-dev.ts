import { config } from '~/src/config'

export const isDev = config.APP_ENV.toLowerCase() === 'dev'
