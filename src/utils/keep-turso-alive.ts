import { db } from '~/db/db'
import { guilds } from '~/db/schema'

async function simpleDatabaseQuery() {
  console.log('keep turso database alive')

  return await db.$count(guilds)
}

export async function startScheduleToKeepTursoAlive() {
  const now = new Date()
  const FIVE_MINUTES = 5 * 60 * 1000

  // calculate the time until the next 5-minute mark
  const nextFiveMinuteMark = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    Math.ceil(now.getMinutes() / 5) * 5,
    0,
  )

  const initialDelay = (nextFiveMinuteMark.getTime() - now.getTime()) % FIVE_MINUTES

  setTimeout(() => {
    simpleDatabaseQuery().catch((error) => console.error(error))

    setInterval(() => simpleDatabaseQuery().catch((error) => console.error(error)), FIVE_MINUTES)
  }, initialDelay)
}
