const { Events } = require("discord.js");

module.exports = async client => {
  // on send message
  client.on(Events.MessageCreate, async message => {
    // stop if the autor is a bot
    if (message?.author?.bot) return;

    // react image in ADD IMAGES thread
    if (
      message.channel?.name?.includes("ADD IMAGES") &&
      message.attachments.size > 0
    )
      await message.react("❌");
    // await message.react('✅')
  });
};
