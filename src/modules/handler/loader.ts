import { Client } from "discord.js";
import { join } from "node:path";
import { browseInFolders } from "./browse-in-folders.ts";
import { Handlers } from "./handlers.ts";
import { builder } from "./builder.ts";

export async function handlersLoader(client: Client) {
  try {
    // Commands handler
    await browseInFolders(
      join(Deno.cwd(), "src/commands"),
      Handlers.prefixCommands(client),
      Handlers.slashCommands(client),
    );

    // Slash Command Updater
    await builder(Handlers.commands);

    // Event handler
    await browseInFolders(
      join(Deno.cwd(), "src/events"),
      Handlers.events(client),
    );
  } catch (e) {
    throw new Error(e);
  }
}
