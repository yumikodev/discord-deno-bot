import { Collection } from "discord.js";
import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN } from "@/config.ts";
import { handlersLoader } from "@/modules/handler/loader.ts";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.slashs = new Collection();
client.prefix = new Collection();

await handlersLoader(client);

// Client login
await client.login(TOKEN);
