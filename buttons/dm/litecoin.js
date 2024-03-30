const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

const description = "MHrbauj51CjyLFxZh97aseBThyKiVsf2W6";

module.exports = {
  name: "litecoin",

  button: new ButtonBuilder()
    .setCustomId("litecoin")
    .setLabel("💲 LITECOIN")
    .setStyle(ButtonStyle.Secondary),

  async execute(interaction) {
    // sendEmbed(interaction, { description, ephemeral: true });
    interaction.reply(description)
  },
};
