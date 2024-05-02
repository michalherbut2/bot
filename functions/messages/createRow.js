const { ActionRowBuilder } = require("discord.js");
const client = require("../../index");

module.exports = (...buttonNames) => {
  // get a buttons
  const buttons = buttonNames.map(
    buttonName => client.buttons.get(buttonName).button
  );
  // const buttons = client.buttons.filter(button => button.directory === directory).map(button => button.button)

  // create a row with the buttons
  return new ActionRowBuilder().addComponents(buttons);
};
