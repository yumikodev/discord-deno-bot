import { relative, join } from "node:path";
import { Client } from "discord.js";
import { Callback } from "./browse-in-folders.ts";
import { EventController } from "../controllers/event.ts";
import { CommandController } from "../controllers/commands.ts";

interface ESModule<T = unknown> {
  default: T;
}

const { dirname } = import.meta;

export class Handlers {
  static commands: unknown[] = [];

  // Prefix Commands Handler
  static prefixCommands(client: Client): Callback {
    return async (path, fileName) => {
      const rPath = relative(dirname!, path); // Relative path
      const command: ESModule = await import(join(rPath, fileName));

      if (
        command.default instanceof CommandController &&
        CommandController.isPrefix(command.default)
      ) {
        client.prefix.set(command.default.data.name, command.default);
      }
    };
  }

  // Slash Commands Handler
  static slashCommands(client: Client): Callback {
    return async (path, fileName) => {
      const rPath = relative(dirname!, path); // Relative path
      const command: ESModule = await import(join(rPath, fileName));

      if (
        command.default instanceof CommandController &&
        CommandController.isSlash(command.default)
      ) {
        client.slashs.set(command.default.data.name, command.default);
        this.commands.push(command.default.data.toJSON());

        console.log(
          `[CommandLoader] ${fileName} (${command.default.data.name}) has been loaded successfully.`
        );
      }
    };
  }

  // Event Handler
  static events(client: Client): Callback {
    return async (path, fileName) => {
      const rPath = relative(dirname!, path); // Relative path
      const event: ESModule = await import(join(rPath, fileName));

      if (event.default instanceof EventController) {
        client.on(event.default.event, event.default.listener);
        console.log(
          `[EventLoader] ${fileName} (${event.default.event}) has been loaded successfully.`
        );
      }
    };
  }
}
