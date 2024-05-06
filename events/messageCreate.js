const { Events } = require("discord.js");
const client = require("../index");

// on send message
client.on(Events.MessageCreate, async message => {
  console.log("widamośći człowieka");

  // stop if the autor is a bot
  if (message?.author?.bot) return;

  console.log("widamośći człowieka");
  // react image in ADD IMAGES thread
  if (
    message.channel?.name?.includes("ADD IMAGES") &&
    message.attachments.size > 0
  ) {
    console.log("dodaje xx");
    await message.react("❌");
  }
  // await message.react('✅')
});
