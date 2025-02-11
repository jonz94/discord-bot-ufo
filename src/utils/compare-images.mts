import { AttachmentBuilder } from 'discord.js'
import { desc } from 'drizzle-orm'
import { rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { compare } from 'odiff-bin'
import Innertube from 'youtubei.js'
import { db } from '~/db/db.mjs'
import { youtubeThumbnails } from '~/db/schema.mjs'
import { client } from '~/src/client.mjs'

let previousImageRecord =
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
  console.log('start')

  const url = await getYoutubeThumbnailUrl('NBrghK0JyIg')

  if (!url) {
    console.error('cannot get youtube thumbnail url via youtubei.js')
    return
  }

  if (!previousImageRecord) {
    const response = await fetch(url)

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.statusText}`)

      return null
    }

    const currentImageBuffer = Buffer.from(await response.arrayBuffer())

    const result = await db
      .insert(youtubeThumbnails)
      .values({ data: currentImageBuffer, updatedAt: new Date() })
      .returning()
    previousImageRecord = result.at(0) ?? null

    const channelIds = (await db.query.youtubeThumbnailChangedNotificationChannels.findMany()).map(
      (record) => record.id,
    )

    await sendMessages(channelIds, currentImageBuffer)

    console.log('done')

    return
  }

  const previousImagePath = join(tmpdir(), 'previous.jpg')
  rmSync(previousImagePath, { force: true })

  writeFileSync(previousImagePath, previousImageRecord.data)

  const response = await fetch(url)
  if (!response.ok) {
    console.error(`Failed to fetch image: ${response.statusText}`)

    return
  }

  const currentImagePath = join(tmpdir(), `downloaded-image-${Date.now()}.jpg`)

  rmSync(currentImagePath, { force: true })

  const currentImageBuffer = Buffer.from(await response.arrayBuffer())
  writeFileSync(currentImagePath, currentImageBuffer)

  console.log(`Image saved to ${currentImagePath}`)

  const tempDiffPath = join(tmpdir(), `diff-image-${Date.now()}.jpg`)
  rmSync(tempDiffPath, { force: true })

  const result = await compare(currentImagePath, previousImagePath, tempDiffPath)

  rmSync(currentImagePath, { force: true })
  rmSync(previousImagePath, { force: true })
  rmSync(tempDiffPath, { force: true })

  console.log({ result })

  if (result.match) {
    return
  }

  await db.insert(youtubeThumbnails).values({ data: currentImageBuffer, updatedAt: new Date() })

  const channelIds = (await db.query.youtubeThumbnailChangedNotificationChannels.findMany()).map((record) => record.id)

  await sendMessages(channelIds, currentImageBuffer)

  console.log('done')
}

export async function startSchedule() {
  const now = new Date()

  // calculate the time until the next minute
  const nextMinute = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes() + 1,
    0, // the trick is setting the seconds to 0
  )

  const delay = (nextMinute.getTime() - now.getTime()) % 60000

  console.log({ now, nextMinute, delay })

  setTimeout(() => {
    compareCurrentWithPreviousImage().catch((error) => console.error(error))

    setInterval(() => compareCurrentWithPreviousImage().catch((error) => console.error(error)), 60000)
  }, delay)
}
