const { Events } = require("discord.js");

module.exports = async client => {
  client.on(Events.MessageCreate, async message => {
    if (message?.author?.bot) return;

    if (
      message.channel?.name?.includes("ADD IMAGES") &&
      message.attachments.size > 0
    )
      await message.react("❌");
    // await message.react('✅')
  });
};
