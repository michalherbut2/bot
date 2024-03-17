const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = async (
  interaction,
  description,
  ephemeral = false
) => {
  const embed = new EmbedBuilder()
    .setColor(0xf60101)
    .setDescription(description)

  const message = { embeds: [embed] };
  if (ephemeral) message.ephemeral = true 
  // if (image) {
  //   if (image.startsWith("http")) message.embeds[0].setImage("image");
  //   else {
  //     message.embeds[0].setImage(`attachment://${image.split("/").pop()}`);
  //     message.files = [attachment];
  //   }
  // }

  interaction.reply(message);
};
