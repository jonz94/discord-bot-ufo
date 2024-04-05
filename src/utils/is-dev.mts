import { config } from '../config.mts'

export const isDev = config.APP_ENV.toLowerCase() === 'dev'
