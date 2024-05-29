const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");
const getPosition = require("./getPosition");

module.exports = async (message, width, height) => {
  // create an image
  const canvas = Canvas.createCanvas(width, height);
  const context = canvas.getContext("2d");
  const image = await Canvas.loadImage(message.attachments.first().url);

  // calculate a ratio
  const ratio = Math.max(width / image.width, height / image.height);

  // calculate new size
  const newWidth = image.width * ratio;
  const newHeight = image.height * ratio;

  // calculate the position to crop the image based on the provided position argument
  let offsetX, offsetY;

  const position = getPosition(message)

  switch (position[0]) {
    case -1: // left
      offsetX = 0;
      break;
    case 1: // right
      offsetX = width - newWidth;
      break;
    default: // center
      offsetX = (width - newWidth) / 2;
      break;
  }

  switch (position[1]) {
    case -1: // top
      offsetY = 0;
      break;
    case 1: // bottom
      offsetY = height - newHeight;
      break;
    default: // center
      offsetY = (height - newHeight) / 2;
      break;
  }

  // Draw the cropped image on the canvas
  context.drawImage(image, offsetX, offsetY, newWidth, newHeight);

  // use the helpful Attachment class structure to process the file for you
  return new AttachmentBuilder(await canvas.encode("jpeg"), {
    name: "image.jpeg",
  });
};
