import { Client } from "discord.js";
import { browseInFolders } from "./browse-in-folders.ts";
import { join } from "node:path";
import { Handlers } from "./handlers.ts";
import { builder } from "./builder.ts";

export async function handlersLoader(client: Client) {
  const { dirname } = import.meta;

  try {
    // Commands handler
    await browseInFolders(
      join(dirname!, "../../commands"),
      Handlers.prefixCommands(client),
      Handlers.slashCommands(client)
    );

    // Slash Command Updater
    await builder(Handlers.commands);

    // Event handler
    await browseInFolders(
      join(dirname!, "../../events"),
      Handlers.events(client)
    );
  } catch (e) {
    throw new Error(e);
  }
}
