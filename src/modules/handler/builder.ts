import { REST, Routes } from "discord.js";
import { CLIENT_ID, GUILD_ID, TOKEN } from "../../config.ts";

export async function builder(commands: unknown[]) {
  const rest = new REST({ version: "10" }).setToken(TOKEN);

  console.log("[BuilderLoader] Started refreshing application (/) commands.");

  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    // Routes.applicationCommands(CLIENT_ID)
    {
      body: commands,
    }
  );

  console.log(
    "[BuilderLoader] Successfully reloaded application (/) commands."
  );
}
