import * as brawl from './brawl.mjs'
import * as fight from './fight.mjs'
import * as fx from './fx.mjs'
import * as yt from './yt.mjs'

const commandsEntries = [brawl, fight, fx, yt].map((command) => [command.commandName, command] as const)

export const commands = Object.fromEntries(commandsEntries)
