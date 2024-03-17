// const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

// module.exports = async (
//   channel,
//   title,
//   description,
//   image,
//   row,
//   color = 0xffc300,
// ) => {
//   const attachment = new AttachmentBuilder(image);

//   const embed = new EmbedBuilder()
//     .setColor(color)
//     .setTitle(title)
//     .setDescription(description)
//     .setImage(
//       "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&"
//     );

//   const message = { embeds: [embed] };
//   if (row) message.components = [row];
//   // if (image) {
//   //   if (image.startsWith("http")) message.embeds[0].setImage("image");
//   //   else {
//   //     message.embeds[0].setImage(`attachment://${image.split("/").pop()}`);
//   //     message.files = [attachment];
//   //   }
//   // }

//   channel.send(message);
// };
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = (
  target,
  { title, description, image, row, color = 0xffc300, ephemeral = false, followUp = false }
) => {
  // const { title, description, image, row, color } = messageData;
  switch (color) {
    case "red":
      color = 0xf60101
      break;
  
    case "green":
      color = 0x248046
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

  console.log("type:", target.type);
  if (target.type == 0) target.send(message);
    
  else if (target.type == 3) {
    
    message.ephemeral = ephemeral

    if (followUp)
      target.followUp(message)
    else
      target.reply(message);

  }
};
