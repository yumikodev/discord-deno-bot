import { VERSION } from "@/config.ts";
import { EventController } from "@/modules/controllers/event.ts";
import { Logger } from "@/modules/utils/logger.ts";
import { ActivityType, setPresence } from "@/modules/utils/presence.ts";

export default new EventController("ready", (client) => {
  const logger = new Logger("Ready");
  logger.log(`${client.user.username} ready!`);

  setPresence(client, [
    {
      content: `v${VERSION}`,
      type: ActivityType.Playing,
      status: "idle",
    },
    {
      content: `${client.users.cache.size} ${
        client.users.cache.size === 1 ? "usuario" : "usuarios"
      }`,
      type: ActivityType.Watching,
      status: "idle",
    },
  ]);
});
