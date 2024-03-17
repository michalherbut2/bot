const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = async (
  {interaction,
  title,
  description,
  image,
  row,
  color = 0xffc300,
  ephemeral}
) => {
  const attachment = new AttachmentBuilder(image);

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setImage(
      "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&"
    );

  const message = { embeds: [embed] };
  if (row) message.components = [row];
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
