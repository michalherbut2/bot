const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (imageURL, width, height) => {
  // create an image
  const canvas = Canvas.createCanvas(width, height);
  const context = canvas.getContext("2d");
  const image = await Canvas.loadImage(imageURL);

  // Draw the cropped image on the canvas
  context.drawImage(image, 0, 0, width, height);

  // use the helpful Attachment class structure to process the file for you
  return new AttachmentBuilder(await canvas.encode("jpeg"), {
    name: "image.jpeg",
  });
};
