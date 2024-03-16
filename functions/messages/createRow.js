const { ActionRowBuilder } = require("discord.js");
const client = require("../../index");

module.exports = (...directory) => {
  const buttons = directory.map(buttonName => client.buttons.get(buttonName).button)
  // const buttons = client.buttons.filter(button => button.directory === directory).map(button => button.button)
  return new ActionRowBuilder().addComponents(buttons)
};
