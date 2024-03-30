const {
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const createTicket = require("../../functions/channels/createTicket");

const labelName = "General Help";

module.exports = {
  name: "generalHelp",

  button: new ButtonBuilder()
    .setCustomId("generalHelp")
    .setLabel(labelName)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("🛠️"),

  async execute(interaction) {
    createTicket(interaction, labelName)
  },
};
