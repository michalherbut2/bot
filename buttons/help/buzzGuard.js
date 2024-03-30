const {
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const createTicket = require("../../functions/channels/createTicket");

const labelName = "Buzz Guard";

module.exports = {
  name: "buzzGuard",

  button: new ButtonBuilder()
    .setCustomId("buzzGuard")
    .setLabel(labelName)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("✅"),

  async execute(interaction) {
    createTicket(interaction, labelName)
  },
};