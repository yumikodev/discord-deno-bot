import { join, relative } from "node:path";
import { Client } from "discord.js";
import { Callback } from "./browse-in-folders.ts";
import { EventController } from "../controllers/event.ts";
import { CommandController } from "../controllers/commands.ts";
import { Logger } from "@/modules/utils/logger.ts";
import { PREFIX } from "@/config.ts";

interface ESModule<T = unknown> {
  default: T;
}

const { dirname } = import.meta;

export class Handlers {
  static commands: unknown[] = [];

  // Prefix Commands Handler
  static prefixCommands(client: Client): Callback {
    const logger = new Logger("CommandHandler");

    return async (path, fileName) => {
      const rPath = relative(dirname!, path); // Relative path
      const command: ESModule = await import(join(rPath, fileName));

      if (
        command.default instanceof CommandController &&
        CommandController.isPrefix(command.default)
      ) {
        client.prefix.set(command.default.data.name, command.default);

        logger.log(
          `{ ${PREFIX}${command.default.data.name} } command has been loaded successfully.`,
        );
      }
    };
  }

  // Slash Commands Handler
  static slashCommands(client: Client): Callback {
    const logger = new Logger("CommandHandler");

    return async (path, fileName) => {
      const rPath = relative(dirname!, path); // Relative path
      const command: ESModule = await import(join(rPath, fileName));

      if (
        command.default instanceof CommandController &&
        CommandController.isSlash(command.default)
      ) {
        client.slashs.set(command.default.data.name, command.default);
        this.commands.push(command.default.data.toJSON());

        logger.log(
          `{ /${command.default.data.name} } command has been loaded successfully.`,
        );
      }
    };
  }

  // Event Handler
  static events(client: Client): Callback {
    const logger = new Logger("EventHandler");

    return async (path, fileName) => {
      const rPath = relative(dirname!, path); // Relative path
      const event: ESModule = await import(join(rPath, fileName));

      if (event.default instanceof EventController) {
        client.on(event.default.event, event.default.listener);
        logger.log(
          `{ ${fileName}, ${event.default.event} } event has been loaded successfully.`,
        );
      }
    };
  }
}
