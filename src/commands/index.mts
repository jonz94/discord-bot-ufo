import * as fight from './fight.mjs'
import * as fx from './fx.mjs'
import * as yt from './yt.mjs'

const commandsEntries = [fight, fx, yt].map((command) => [command.commandName, command] as const)

export const commands = Object.fromEntries(commandsEntries)
