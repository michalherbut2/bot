const { Events } = require("discord.js");
const client = require("../index");
const sendError = require("../functions/messages/sendError");

// on send message
client.on(Events.MessageCreate, async message => {
  // stop if the autor is a bot
  // if (message?.author?.bot) return;

  const { channel } = message;

  // give a reactions to the image in the ADD IMAGES thread
  if (channel?.name?.includes("ADD IMAGES")) {
    // get all messages
    const messages = await channel.messages.fetch();

    // get messages with images
    const imageMessages = messages.filter(m => m.attachments.size === 1);

    // delete image if there are more than 2 pictures
    try {
      if (imageMessages.size > 2) {
        // delete image if there are more than 2 pictures
        await Promise.all(
          imageMessages
            .first(imageMessages.size - 2)
            .map(async i => await i.delete())
        );

        // message.delete();
        throw new Error("You cannot send more than **two** images.!");
      } else if (message.attachments.size > 1) {
        // send all images separately
        await Promise.all(
          message.attachments.first(2 - imageMessages.size).map(
            async a => await channel.send({ files: [a.url] })
          )
        );

        // delete origin message
        message.delete();
      } else if (message.attachments.size == 1) {
        await message.react("❌");

        // get all emojis
        const emojis = await message.guild.emojis.fetch();

        // get the main page emoji
        const emoji = emojis.find(e => e.name.toLowerCase() === "mainpage");

        // give the main page emoji reaction
        await message.react(emoji.id);
        // await message.react("1236938634892935190"); // main page emoji

        // give the position emoji reactions
        await message.react("⬆️");
        await message.react("⬇️");
        await message.react("⬅️");
        await message.react("➡️");
      }
    } catch (error) {
      sendError(error, channel);
    }
  }
});
