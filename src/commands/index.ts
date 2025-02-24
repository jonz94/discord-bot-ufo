import * as brawl from './brawl'
import * as fight from './fight'
import * as fx from './fx'
import * as member from './member'
import * as version from './version'
import * as yt from './yt'

const commandsEntries = [brawl, fight, fx, member, version, yt].map(
  (command) => [command.commandName, command] as const,
)

export const commands = Object.fromEntries(commandsEntries)
