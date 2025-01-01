import { Client } from "discord.js";
import { PresenceData, PresenceStatusData } from "discord.js";
import { ActivityType } from "discord-api-types/v10";

export { ActivityType };

export interface StatusType {
  type:
    | ActivityType.Playing
    | ActivityType.Streaming
    | ActivityType.Listening
    | ActivityType.Watching
    | ActivityType.Competing;
  content: string;
  status: PresenceStatusData;
  url?: string;
}

export function setPresence(client: Client<true>, statusOptions: StatusType[]) {
  let index = 0;
  let presence: PresenceData;

  setInterval(() => {
    index++;
    if (index >= statusOptions.length) index = 0;

    if (statusOptions[index].type !== ActivityType.Streaming) {
      presence = {
        activities: [
          {
            name: statusOptions[index].content,
            type: statusOptions[index].type,
          },
        ],
        status: statusOptions[index].status,
      };
    } else {
      presence = {
        activities: [
          {
            name: statusOptions[index].content,
            type: statusOptions[index].type,
            url: statusOptions[index].url,
          },
        ],
        status: statusOptions[index].status,
      };
    }

    client.user.setPresence(presence);
  }, 1000 * 10 /* <-- Cada 10 segundos */);
}
