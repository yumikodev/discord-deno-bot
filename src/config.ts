import "@std/dotenv/load";

export const {
  BOT_TOKEN: TOKEN,
  CLIENT_ID,
  GUILD_ID,
  BOT_PREFIX: PREFIX = "!",
  BOT_VERSION: VERSION = "1.0.0",
} = Deno.env.toObject();
