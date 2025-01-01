import { Collection } from "discord.js";
import { CommandType } from "@/modules/controllers/commands.ts";
import { CommandController } from "@/modules/controllers/commands.ts";
import "@/client.ts";

declare module "discord.js" {
  interface Client {
    prefix: Collection<string, CommandController<CommandType.Prefix>>;
    slashs: Collection<string, CommandController<CommandType.Slash>>;
  }
}
