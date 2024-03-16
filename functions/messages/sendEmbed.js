const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = async (channel, title, description, image, row) => {

  const attachment = new AttachmentBuilder(image);

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description);

  const message = { embeds: [embed] };
  if (row) message.components = [row];
  if (image) {
    message.embeds[0].setImage(`attachment://${image.split("/").pop()}`);
    message.files = [attachment];
  }

  channel.send(message);
};
