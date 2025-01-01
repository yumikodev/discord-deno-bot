import { VERSION } from "../../config.ts";
import { EventController } from "../../modules/controllers/event.ts";
import { ActivityType, setPresence } from "../../modules/utils/presence.ts";

export default new EventController("ready", (client) => {
  console.log(`${client.user.username} en linea!`);

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
