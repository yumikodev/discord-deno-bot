import * as PCT from "./types/pct.ts";
import * as SCT from "./types/sct.ts";

export enum CommandType {
  Prefix,
  Slash,
}

export class CommandController<T extends CommandType> {
  data: T extends CommandType.Prefix ? PCT.Data : SCT.Data;
  run: T extends CommandType.Prefix ? PCT.Run : SCT.Run;

  constructor(public type: T) {}

  setData(data: T extends CommandType.Prefix ? PCT.Data : SCT.Data): this {
    this.data = data;
    return this;
  }

  setRun(runner: T extends CommandType.Prefix ? PCT.Run : SCT.Run) {
    this.run = runner;
    return this;
  }

  static isSlash(
    command: CommandController<CommandType.Prefix | CommandType.Slash>,
  ): command is CommandController<CommandType.Slash> {
    return command.type === CommandType.Slash;
  }

  static isPrefix(
    command: CommandController<CommandType.Prefix | CommandType.Slash>,
  ): command is CommandController<CommandType.Prefix> {
    return command.type === CommandType.Prefix;
  }
}
