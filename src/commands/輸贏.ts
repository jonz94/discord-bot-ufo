import { ChannelType, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { emojis } from '../emoji-list'
import { Fight } from '../types'
import { getSortedKey } from '../utils'

export const data = new SlashCommandBuilder()
  .setName('輸贏')
  .setDescription('找人輸贏')
  .addUserOption((option) => option.setName('對手').setDescription('找誰輸贏').setRequired(true))

export async function execute(interaction: CommandInteraction) {
  if (interaction.channel?.type === ChannelType.GuildVoice) {
    await interaction.reply({
      content: '無法在語音頻道與人輸贏，請轉移陣地到一般的文字頻道，拍謝QQ',
      ephemeral: true,
    })

    return
  }

  const opponent = interaction.options.getUser('對手')

  if (!opponent) {
    await interaction.reply({
      content: '請選擇要輸贏的對手',
      ephemeral: true,
    })

    return
  }

  if (opponent.bot) {
    await interaction.reply({
      content: '抱歉，無法跟機器人輸贏',
      ephemeral: true,
    })

    return
  }

  const author = interaction.user
  const fighters = new Set([author.id, opponent.id])

  if (fighters.size <= 1) {
    await interaction.reply({
      content: '你是要跟自己輸贏嗎？笑死',
      ephemeral: true,
    })

    return
  }

  const sortedFightersKey = getSortedKey(Object.values(Array.from(fighters)))

  if (globalThis.fightersKey.has(sortedFightersKey)) {
    await interaction.reply({
      content: '上次輸贏還沒結束欸',
      ephemeral: true,
    })

    return
  }

  globalThis.fightersKey.add(sortedFightersKey)

  const message = await interaction.channel?.send({
    content: [author, '向', opponent, '下了戰帖', emojis.白眼海豚笑].join(' '),
  })

  if (!message) {
    await interaction.reply({
      content: '發送戰帖失敗QQ',
      ephemeral: true,
    })

    return
  }

  const fights = {
    id: message.id,
    fighters,
    author: { user: author, attempts: [] },
    opponent: { user: opponent, attempts: [] },
  } satisfies Fight

  globalThis.fights.set(message.id, fights)

  await interaction.reply({
    content: ['已經向', opponent, '發出戰帖'].join(' '),
    ephemeral: true,
  })

  await message?.react(emojis.貓咪拿槍)
}
