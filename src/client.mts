import { Client, GatewayIntentBits, Partials } from 'discord.js'

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    // for reading message and its content, these two need to be setup
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,

    // for reactions
    GatewayIntentBits.GuildMessageReactions,
  ],

  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
})
