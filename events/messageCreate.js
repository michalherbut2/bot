const { Events } = require("discord.js");
const client = require("../index");

// on send message
client.on(Events.MessageCreate, async message => {
  // stop if the autor is a bot
  if (message?.author?.bot) return;

  // give a reactions to the image in the ADD IMAGES thread
  if (
    message.channel?.name?.includes("ADD IMAGES") &&
    message.attachments.size > 0
  ) {
    await message.react("❌");
    
    // get all emojis
    const emojis = await message.guild.emojis.fetch();

    // get the main page emoji
    const emoji = emojis.find(e => e.name.toLowerCase() === "mainpage");

    // give the main page emoji reaction
    await message.react(emoji.id);
    // await message.react("1236938634892935190"); // main page emoji
  }
});
