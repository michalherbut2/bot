require("dotenv").config();
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    // GatewayIntentBits.GuildInvites
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

// Initializing the project
require("./handler/interaction")(client);
require("./handler/messageCreate")(client);

client
  .on("warn", console.warn)
  .on("error", error => console.error("\x1b[31m%s\x1b[0m", error))
  .on("shardError", console.error);

process
  .on("uncaughtException", console.error)
  .on("uncaughtExceptionMonitor", console.error)
  .on("unhandledRejection", console.error);

client.login(process.env.TOKEN);
