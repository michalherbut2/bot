const {
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const createTicket = require("../../functions/channels/createTicket");

const labelName = "Buzz Home";

module.exports = {
  name: "buzzHome",

  button: new ButtonBuilder()
    .setCustomId("buzzHome")
    .setLabel(labelName)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("✅"),

  async execute(interaction) {
    createTicket(interaction, labelName)
  },
};