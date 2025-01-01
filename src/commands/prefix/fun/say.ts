import { ChannelType } from "discord.js";
import {
  CommandController,
  CommandType,
} from "@/modules/controllers/commands.ts";

export default new CommandController(CommandType.Prefix)
  .setData({
    name: "say",
    alias: ["echo"],
    description: "Say a message",
  })
  .setRun(async (_client, msg, args) => {
    if (msg.channel.type !== ChannelType.GuildText) return;

    try {
      const txt = args.join(" ");
      await msg.delete();

      if (!txt) {
        return await msg.channel.send({
          content: "Tienes que poner el contenido.",
        });
      }

      await msg.channel.send({ content: txt });
    } catch (err) {
      console.log(err);
      await msg.channel.send({ content: err.message });
    }
  });
