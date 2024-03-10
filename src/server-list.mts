export type ServerInfo = {
  name: string
  guildId: string
  allowDev: boolean
}

export const servers = [
  {
    name: '幽浮小屋',
    guildId: '812432862656987166',
    allowDev: true,
  },
  {
    name: '貓草大飯店2.0',
    guildId: '1181691437788696587',
    allowDev: false,
  },
  {
    name: '快樂烏托邦',
    guildId: '835865907385073674',
    allowDev: false,
  },
] as const satisfies readonly ServerInfo[]
