const { BaseInteraction, BaseChannel } = require("discord.js");

module.exports = async (target, files, followUp = false) => {
  console.log("start sending images");

  console.log(files);
  const message = { files };

  console.log("type:", target?.type);
  if (target instanceof BaseChannel) target.send(message);
  else if (target instanceof BaseInteraction) {
    if (followUp) await target.followUp(message);
    else await target.reply(message);
    console.log("kox");
  }
};
