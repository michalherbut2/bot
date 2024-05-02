const { ButtonBuilder, ButtonStyle } = require("discord.js");

const description = "MHrbauj51CjyLFxZh97aseBThyKiVsf2W6";

module.exports = {
  name: "litecoin",

  button: new ButtonBuilder()
    .setCustomId("litecoin")
    .setLabel("💲 LITECOIN")
    .setStyle(ButtonStyle.Secondary),

  async run(interaction) {
    interaction.reply(description);
  },
};
