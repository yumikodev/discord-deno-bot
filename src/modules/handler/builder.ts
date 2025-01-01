import { REST, Routes } from "discord.js";
import { CLIENT_ID, GUILD_ID, TOKEN } from "@/config.ts";
import { Logger } from "@/modules/utils/logger.ts";

export async function builder(commands: unknown[]) {
  const logger = new Logger("BuilderLoader");

  try {
    const rest = new REST({ version: "10" }).setToken(TOKEN);

    logger.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      // Routes.applicationCommands(CLIENT_ID)
      {
        body: commands,
      },
    );

    logger.log("Successfully reloaded application (/) commands.");
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
}
