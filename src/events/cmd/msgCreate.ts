import { ChannelType } from "discord.js";
import { PREFIX } from "@/config.ts";
import { EventController } from "@/modules/controllers/event.ts";

export default new EventController("messageCreate", async (message) => {
  if (message.channel.type === ChannelType.DM) return;
  if (message.author.bot) return;

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const command = args.shift()?.toLowerCase();

  const cmd = message.client.prefix.find(
    (c) =>
      c.data.name === command ||
      (c.data.alias && c.data.alias.includes(`${command}`)),
  );

  try {
    if (!cmd) {
      await message.channel.sendTyping();
      return await message.reply({
        content: `Command \`${command}\` doesn't exist`,
      });
    }

    await message.channel.sendTyping();
    await cmd.run(message.client, message, args);
  } catch (err) {
    console.log(err);
    await message.reply({ content: err.message });
  }
});
