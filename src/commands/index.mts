import * as fight from './fight.mjs'
import * as yt from './yt.mjs'

const commandsEntries = [fight, yt].map((command) => [command.commandName, command])

export const commands = Object.fromEntries(commandsEntries)
