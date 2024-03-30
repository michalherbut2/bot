const { Events, ActionRowBuilder } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");
const detectEmbed = require("../functions/messages/detectEmbed");
const createRow = require("../functions/messages/createRow");

module.exports = async client => {
  client.on(Events.MessageCreate, async message => {
    // console.log(message);
    if (message?.author?.bot) return;

    if (
      message.channel?.name?.includes("ADD IMAGES") &&
      message.attachments.size > 0
    )
      await message.react("❌");
    // await message.react('✅')
  });
};
