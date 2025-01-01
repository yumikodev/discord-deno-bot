// SCT -> Slashs Command Types

import { SlashCommandOptionsOnlyBuilder } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

export type Data =
  | SlashCommandBuilder
  | SlashCommandSubcommandsOnlyBuilder
  | SlashCommandOptionsOnlyBuilder;

export type Run<T = unknown> = (
  interaction: ChatInputCommandInteraction<"cached">
) => T;
