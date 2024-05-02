const { ButtonBuilder, ButtonStyle } = require("discord.js");
const createTicket = require("../../functions/channels/createTicket");

// embed content
const labelName = "Buzz Guard";

module.exports = {
  name: "buzzGuard",

  button: new ButtonBuilder()
    .setCustomId("buzzGuard")
    .setLabel(labelName)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("✅"),

  async run(interaction) {
    createTicket(interaction, labelName);
  },
};
