import * as brawl from './brawl.mts'
import * as fight from './fight.mts'
import * as fx from './fx.mts'
import * as member from './member.mts'
import * as version from './version.mts'
import * as yt from './yt.mts'

const commandsEntries = [brawl, fight, fx, member, version, yt].map(
  (command) => [command.commandName, command] as const,
)

export const commands = Object.fromEntries(commandsEntries)
