const {
  EmbedBuilder,
  AttachmentBuilder
} = require("discord.js");

module.exports = async (
  mess,
  {
    title,
    description,
    image,
    row,
    color = 0xffc300
  }
) => {
  console.log("start edit mebed");
  switch (color) {
    case "red":
      color = 0xf60101;
      break;

    case "green":
      color = 0x248046;
      break;

    default:
      break;
  }
  const embed = new EmbedBuilder().setColor(color).setDescription(description);
  if (title) embed.setTitle(title);

  const message = { embeds: [embed] };
  if (row) message.components = [row];

  if (image && image.startsWith("http")) {
    message.embeds[0].setImage(image);
  } else if (image) {
    const attachment = new AttachmentBuilder(image);
    message.embeds[0].setImage(`attachment://${image.split("/").pop()}`);
    message.files = [attachment];
  }

  mess.edit(message);
};
