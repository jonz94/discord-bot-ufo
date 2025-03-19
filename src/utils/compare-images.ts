import { AttachmentBuilder } from 'discord.js'
import { desc } from 'drizzle-orm'
import Innertube from 'youtubei.js'
import { db } from '~/db/db'
import { youtubeThumbnails } from '~/db/schema'
import { client } from '~/src/client'

let previousThumbnailRecord =
  (await db.query.youtubeThumbnails.findFirst({ orderBy: desc(youtubeThumbnails.updatedAt) })) ?? null

async function getYoutubeThumbnailUrl(videoId: string) {
  const youtube = await Innertube.create()
  const video = await youtube.getBasicInfo(videoId)
  const thumbnails = video.basic_info.thumbnail ?? []

  return thumbnails.at(0)?.url ?? null
}

async function sendMessages(channelIds: string[], currentImageBuffer: Buffer) {
  for (const channelId of channelIds) {
    try {
      const channel = await client.channels.fetch(channelId)
      if (channel && channel.isSendable()) {
        await channel.send({
          content: '庫主播的週表更新了！',
          files: [new AttachmentBuilder(currentImageBuffer)],
        })
      }
    } catch (error) {
      console.log(`send message to channel ${channelId} failed`)
      console.error(error)
    }
  }
}

async function compareCurrentWithPreviousImage() {
  console.log('start: compareCurrentWithPreviousImage')

  const currentThumbnailUrl = await getYoutubeThumbnailUrl('NBrghK0JyIg')

  if (!currentThumbnailUrl) {
    console.error('cannot get youtube thumbnail url via youtubei.js')
    return
  }

  if (!previousThumbnailRecord) {
    const response = await fetch(currentThumbnailUrl)

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.statusText}`)

      return null
    }

    const currentImageBuffer = Buffer.from(await response.arrayBuffer())

    const result = await db
      .insert(youtubeThumbnails)
      .values({ url: currentThumbnailUrl, data: currentImageBuffer, updatedAt: new Date() })
      .returning()
    previousThumbnailRecord = result.at(0) ?? null

    const channelIds = (await db.query.youtubeThumbnailChangedNotificationChannels.findMany()).map(
      (record) => record.id,
    )

    await sendMessages(channelIds, currentImageBuffer)

    console.log('done')

    return
  }

  if (previousThumbnailRecord.url === currentThumbnailUrl) {
    console.log('same')
    return
  }

  console.log(
    'youtube thumbnail url changed:',
    JSON.stringify(
      {
        previous: previousThumbnailRecord.url,
        current: currentThumbnailUrl,
      },
      null,
      2,
    ),
  )

  const response = await fetch(currentThumbnailUrl)
  if (!response.ok) {
    console.error(`Failed to fetch image: ${response.statusText}`)

    return
  }

  const currentImageBuffer = Buffer.from(await response.arrayBuffer())

  const newInsertedRecords = await db
    .insert(youtubeThumbnails)
    .values({ url: currentThumbnailUrl, data: currentImageBuffer, updatedAt: new Date() })
    .returning()

  const channelIds = (await db.query.youtubeThumbnailChangedNotificationChannels.findMany()).map((record) => record.id)

  try {
    previousThumbnailRecord = newInsertedRecords.at(0)!
  } catch (error) {
    console.log('error at line: `previousThumbnailRecord = newInsertedRecords.at(0)!`')
    console.error(error)
  }

  try {
    await sendMessages(channelIds, currentImageBuffer)
  } catch (error) {
    console.log('error when sending message to discord')
    console.error(error)
  }

  console.log('done')
}

export async function startScheduleForComparingYoutubeThumbnails() {
  const now = new Date()
  const ONE_MINUTE = 60 * 1000

  // calculate the time until the next minute
  const nextMinute = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes() + 1,
    0, // the trick is setting the seconds to 0
  )

  const initialDelay = (nextMinute.getTime() - now.getTime()) % ONE_MINUTE

  setTimeout(() => {
    compareCurrentWithPreviousImage().catch((error) => console.error(error))

    setInterval(() => compareCurrentWithPreviousImage().catch((error) => console.error(error)), ONE_MINUTE)
  }, initialDelay)
}
