// PCT -> Prefix Command Types

import { Client, Message } from "discord.js";

export interface Data {
  name: string;
  description: string;
  alias: string[];
}

export type Run<T = unknown> = (
  client: Client<true>,
  message: Message,
  args: string[],
) => T;
