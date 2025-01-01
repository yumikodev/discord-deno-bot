import { join } from "node:path";

export type Callback<T = unknown> = (path: string, fileName: string) => T;

export async function browseInFolders(path: string, ...handlers: Callback[]) {
  const mainDir = Deno.readDir(path);

  for await (const archive of mainDir) {
    // If is a folder...
    if (archive.isDirectory) {
      await browseInFolders(join(path, archive.name), ...handlers);
    }

    // If is a file
    if (archive.isFile) {
      for (const cb of handlers) {
        await cb(path, archive.name);
      }
    }
  }
}
