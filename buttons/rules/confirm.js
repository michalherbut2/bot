const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  name: "confirm",

  button: new ButtonBuilder()
    .setCustomId("confirm")
    .setLabel("CONFIRM")
    .setStyle(ButtonStyle.Secondary),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { member } = interaction;
    member.kick("They did not agree to the rules.");
  },
};
