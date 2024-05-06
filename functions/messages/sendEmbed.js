const {
  EmbedBuilder,
  AttachmentBuilder,
  BaseInteraction,
  BaseChannel,
  User,
} = require("discord.js");

module.exports = async (
  target,
  {
    title,
    description,
    image,
    thumbnail,
    row,
    footerText,
    color = 0xffc300,
    ephemeral = false,
    followUp = false,
  }
) => {
  switch (color) {
    case "red":
      color = 0xf60101;
      break;

    case "green":
      color = 0x248046;
      break;
    
    case "light green":
      color = 0x90EE90;
      break;

    default:
      break;
  }

  // create an embed
  const embed = new EmbedBuilder().setColor(color).setDescription(description);
  if (title) embed.setTitle(title);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (footerText) embed.setFooter({ text: footerText });

  // create a message
  const message = { embeds: [embed], ephemeral };
  if (row) message.components = [row];

  // handle an images
  if (image instanceof Array) {
    image.map(i => message.embeds[0].setImage(i));
    console.log(image);
  } else if (image?.startsWith("http")) {
    message.embeds[0].setImage(image);
  } else if (image) {
    const attachment = new AttachmentBuilder(image);
    message.embeds[0].setImage(`attachment://${image.split("/").pop()}`);
    message.files = [attachment];
  }

  // send the message
  console.log("\x1b[32m%s\x1b[0m", "sending embed"); // green

  if (target instanceof BaseChannel || target instanceof User)
    // send to the channel or user
    return await target.send(message);
  else if (target instanceof BaseInteraction) {
    // follow up
    if (followUp) return await target.followUp(message);
    // reply
    else return await target.reply(message);
  }

  console.log("\x1b[31m%s\x1b[0m", "The embed has not been sent."); // red
};
