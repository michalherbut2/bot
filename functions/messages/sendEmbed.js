const {
  EmbedBuilder,
  AttachmentBuilder,
  BaseInteraction,
  BaseChannel,
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
    // name,
  }
) => {
  console.log("start mebed");
  // const { title, description, image, row, color } = messageData;
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
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (footerText) embed.setFooter({text: footerText})

  const message = { embeds: [embed] };
  if (row) message.components = [row];

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

  console.log("type:", target?.type);
  // if (target instanceof ForumChannel) {
  //   target.threads.create({
  //     name,
  //     message,
  //     appliedTags: [target?.availableTags[0]?.id], //,279284729461604362,1107268916167843930
  //   });
  // } else
  console.log("sending embed");
  if (target instanceof BaseChannel) return await target.send(message);
  else if (target instanceof BaseInteraction) {
    message.ephemeral = ephemeral;

    if (followUp) return await target.followUp(message);
    else return await target.reply(message);
  }
};
