const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (imageURL, width, height) => {
  // create an image
  console.log(Canvas.createCanvas);
  const canvas = Canvas.createCanvas(width, height);
  const context = canvas.getContext("2d");
  const image = await Canvas.loadImage(imageURL);

  // calculate a ratio
  const ratio = Math.max(width / image.width, height / image.height);

  // calculate new size
  const newWidth = image.width * ratio;
  const newHeight = image.height * ratio;

  // calculate the position to crop the image for centering
  const offsetX = (width - newWidth) / 2;
  const offsetY = (height - newHeight) / 2;

  // Draw the cropped image on the canvas
  context.drawImage(image, offsetX, offsetY, newWidth, newHeight);

  // use the helpful Attachment class structure to process the file for you
  return new AttachmentBuilder(await canvas.encode("jpeg"), {
    name: "image.jpeg",
  });
};
