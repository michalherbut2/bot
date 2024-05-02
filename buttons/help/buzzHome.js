const { ButtonBuilder, ButtonStyle } = require("discord.js");
const createTicket = require("../../functions/channels/createTicket");

// embed content
const labelName = "Buzz Home";

module.exports = {
  name: "buzzHome",

  button: new ButtonBuilder()
    .setCustomId("buzzHome")
    .setLabel(labelName)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("✅"),

  async run(interaction) {
    createTicket(interaction, labelName);
  },
};
